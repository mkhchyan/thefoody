import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const createBookingSchema = z.object({
    restaurantId: z.string().min(1, "Restaurant ID is required"),
    tableId: z.string().optional(),
    bookingDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    bookingTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: "Invalid time format (HH:MM)",
    }),
    partySize: z.number().int().min(1).max(20),
    specialRequests: z.string().max(500).optional(),
})

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const restaurantId = searchParams.get("restaurantId")

    try {
        const isAdmin = session.user.role === "ADMIN"

        const bookings = await prisma.booking.findMany({
            where: {
                ...(!isAdmin && { userId: session.user.id }),
                ...(status && { status }),
                ...(restaurantId && { restaurantId }),
            },
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        city: true,
                        imageUrl: true,
                    },
                },
                table: true,
                user: isAdmin
                    ? { select: { id: true, name: true, email: true } }
                    : false,
            },
            orderBy: {
                bookingDate: "desc",
            },
        })

        return NextResponse.json(bookings)
    } catch (error) {
        console.error("Failed to fetch bookings:", error)
        return NextResponse.json(
            { error: "Failed to fetch bookings" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const body = await request.json()

        const validationResult = createBookingSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validationResult.error.flatten() },
                { status: 400 }
            )
        }

        const data = validationResult.data

        // Verify restaurant exists and is active
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: data.restaurantId, isActive: true },
        })

        if (!restaurant) {
            return NextResponse.json(
                { error: "Restaurant not found or is not available" },
                { status: 404 }
            )
        }

        // If tableId provided, verify table exists and is available
        if (data.tableId) {
            const table = await prisma.table.findUnique({
                where: {
                    id: data.tableId,
                    restaurantId: data.restaurantId,
                },
            })

            if (!table) {
                return NextResponse.json(
                    { error: "Table not found" },
                    { status: 404 }
                )
            }

            if (table.capacity < data.partySize) {
                return NextResponse.json(
                    { error: "Table capacity is insufficient for party size" },
                    { status: 400 }
                )
            }
        }

        const bookingDate = new Date(data.bookingDate)

        // Check for booking conflicts (same restaurant, date, time, and table)
        if (data.tableId) {
            const conflictingBooking = await prisma.booking.findFirst({
                where: {
                    tableId: data.tableId,
                    bookingDate: bookingDate,
                    bookingTime: data.bookingTime,
                    status: { in: ["pending", "confirmed"] },
                },
            })

            if (conflictingBooking) {
                return NextResponse.json(
                    { error: "This table is already booked for the selected date and time" },
                    { status: 409 }
                )
            }
        }

        const booking = await prisma.booking.create({
            data: {
                userId: session.user.id,
                restaurantId: data.restaurantId,
                tableId: data.tableId || null,
                bookingDate: bookingDate,
                bookingTime: data.bookingTime,
                partySize: data.partySize,
                specialRequests: data.specialRequests || null,
                status: "pending",
            },
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        city: true,
                    },
                },
                table: true,
            },
        })

        return NextResponse.json(booking, { status: 201 })
    } catch (error) {
        console.error("Failed to create booking:", error)
        return NextResponse.json(
            { error: "Failed to create booking" },
            { status: 500 }
        )
    }
}
