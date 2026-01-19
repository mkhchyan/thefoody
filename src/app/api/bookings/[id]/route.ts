import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const updateBookingSchema = z.object({
    tableId: z.string().optional().nullable(),
    bookingDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        })
        .optional(),
    bookingTime: z
        .string()
        .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
            message: "Invalid time format (HH:MM)",
        })
        .optional(),
    partySize: z.number().int().min(1).max(20).optional(),
    specialRequests: z.string().max(500).optional().nullable(),
    status: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional(),
})

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        city: true,
                        phone: true,
                        imageUrl: true,
                    },
                },
                table: true,
                user: {
                    select: { id: true, name: true, email: true },
                },
                reviews: true,
            },
        })

        if (!booking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            )
        }

        // Users can only view their own bookings, admins can view all
        if (session.user.role !== "ADMIN" && booking.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            )
        }

        return NextResponse.json(booking)
    } catch (error) {
        console.error("Failed to fetch booking:", error)
        return NextResponse.json(
            { error: "Failed to fetch booking" },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const body = await request.json()

        const validationResult = updateBookingSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validationResult.error.flatten() },
                { status: 400 }
            )
        }

        const existingBooking = await prisma.booking.findUnique({
            where: { id },
        })

        if (!existingBooking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            )
        }

        const isAdmin = session.user.role === "ADMIN"
        const isOwner = existingBooking.userId === session.user.id

        if (!isAdmin && !isOwner) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            )
        }

        const data = validationResult.data

        // Non-admin users can only update certain fields and can't change status to confirmed
        if (!isAdmin) {
            if (data.status && data.status === "confirmed") {
                return NextResponse.json(
                    { error: "Only admins can confirm bookings" },
                    { status: 403 }
                )
            }

            if (existingBooking.status === "completed" || existingBooking.status === "cancelled") {
                return NextResponse.json(
                    { error: "Cannot modify a completed or cancelled booking" },
                    { status: 400 }
                )
            }
        }

        // Check table availability if changing table, date, or time
        if (data.tableId || data.bookingDate || data.bookingTime) {
            const tableId = data.tableId ?? existingBooking.tableId
            const bookingDate = data.bookingDate
                ? new Date(data.bookingDate)
                : existingBooking.bookingDate
            const bookingTime = data.bookingTime ?? existingBooking.bookingTime

            if (tableId) {
                const conflictingBooking = await prisma.booking.findFirst({
                    where: {
                        id: { not: id },
                        tableId: tableId,
                        bookingDate: bookingDate,
                        bookingTime: bookingTime,
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
        }

        const booking = await prisma.booking.update({
            where: { id },
            data: {
                ...(data.tableId !== undefined && { tableId: data.tableId }),
                ...(data.bookingDate && { bookingDate: new Date(data.bookingDate) }),
                ...(data.bookingTime && { bookingTime: data.bookingTime }),
                ...(data.partySize && { partySize: data.partySize }),
                ...(data.specialRequests !== undefined && { specialRequests: data.specialRequests }),
                ...(data.status && { status: data.status }),
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

        return NextResponse.json(booking)
    } catch (error) {
        console.error("Failed to update booking:", error)
        return NextResponse.json(
            { error: "Failed to update booking" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const existingBooking = await prisma.booking.findUnique({
            where: { id },
        })

        if (!existingBooking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            )
        }

        const isAdmin = session.user.role === "ADMIN"
        const isOwner = existingBooking.userId === session.user.id

        if (!isAdmin && !isOwner) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            )
        }

        // Soft delete by setting status to cancelled
        await prisma.booking.update({
            where: { id },
            data: { status: "cancelled" },
        })

        return NextResponse.json({ message: "Booking cancelled successfully" })
    } catch (error) {
        console.error("Failed to cancel booking:", error)
        return NextResponse.json(
            { error: "Failed to cancel booking" },
            { status: 500 }
        )
    }
}
