import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const createReviewSchema = z.object({
    restaurantId: z.string().min(1, "Restaurant ID is required"),
    bookingId: z.string().optional(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().max(1000).optional(),
})

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get("restaurantId")
    const userId = searchParams.get("userId")

    try {
        const reviews = await prisma.review.findMany({
            where: {
                ...(restaurantId && { restaurantId }),
                ...(userId && { userId }),
            },
            include: {
                user: {
                    select: { id: true, name: true, image: true },
                },
                restaurant: {
                    select: { id: true, name: true },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return NextResponse.json(reviews)
    } catch (error) {
        console.error("Failed to fetch reviews:", error)
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
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

        const validationResult = createReviewSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validationResult.error.flatten() },
                { status: 400 }
            )
        }

        const data = validationResult.data

        // Verify restaurant exists
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: data.restaurantId },
        })

        if (!restaurant) {
            return NextResponse.json(
                { error: "Restaurant not found" },
                { status: 404 }
            )
        }

        // If bookingId provided, verify it belongs to the user and restaurant
        if (data.bookingId) {
            const booking = await prisma.booking.findUnique({
                where: { id: data.bookingId },
            })

            if (!booking) {
                return NextResponse.json(
                    { error: "Booking not found" },
                    { status: 404 }
                )
            }

            if (booking.userId !== session.user.id) {
                return NextResponse.json(
                    { error: "You can only review your own bookings" },
                    { status: 403 }
                )
            }

            if (booking.restaurantId !== data.restaurantId) {
                return NextResponse.json(
                    { error: "Booking does not match restaurant" },
                    { status: 400 }
                )
            }

            // Check if review already exists for this booking
            const existingReview = await prisma.review.findUnique({
                where: { bookingId: data.bookingId },
            })

            if (existingReview) {
                return NextResponse.json(
                    { error: "A review already exists for this booking" },
                    { status: 409 }
                )
            }
        }

        const review = await prisma.review.create({
            data: {
                userId: session.user.id,
                restaurantId: data.restaurantId,
                bookingId: data.bookingId || null,
                rating: data.rating,
                comment: data.comment || null,
            },
            include: {
                user: {
                    select: { id: true, name: true, image: true },
                },
                restaurant: {
                    select: { id: true, name: true },
                },
            },
        })

        // Update restaurant's average rating
        const averageRating = await prisma.review.aggregate({
            where: { restaurantId: data.restaurantId },
            _avg: { rating: true },
        })

        if (averageRating._avg.rating) {
            await prisma.restaurant.update({
                where: { id: data.restaurantId },
                data: { rating: Math.round(averageRating._avg.rating * 10) / 10 },
            })
        }

        return NextResponse.json(review, { status: 201 })
    } catch (error) {
        console.error("Failed to create review:", error)
        return NextResponse.json(
            { error: "Failed to create review" },
            { status: 500 }
        )
    }
}
