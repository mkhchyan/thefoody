import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const updateRestaurantSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    address: z.string().min(1).max(200).optional(),
    city: z.string().min(1).max(100).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    cuisineId: z.string().optional().nullable(),
    imageUrl: z.string().url().optional().or(z.literal("")),
    rating: z.number().min(0).max(5).optional(),
    priceRange: z.number().int().min(1).max(4).optional(),
    openingTime: z.string().optional(),
    closingTime: z.string().optional(),
    isActive: z.boolean().optional(),
})

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id },
            include: {
                cuisine: true,
                tables: true,
                reviews: {
                    include: {
                        user: {
                            select: { id: true, name: true, image: true },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                    take: 10,
                },
                _count: {
                    select: { reviews: true, bookings: true },
                },
            },
        })

        if (!restaurant) {
            return NextResponse.json(
                { error: "Restaurant not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(restaurant)
    } catch (error) {
        console.error("Failed to fetch restaurant:", error)
        return NextResponse.json(
            { error: "Failed to fetch restaurant" },
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

    if (session.user.role !== "ADMIN") {
        return NextResponse.json(
            { error: "Forbidden - Admin access required" },
            { status: 403 }
        )
    }

    try {
        const body = await request.json()

        const validationResult = updateRestaurantSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validationResult.error.flatten() },
                { status: 400 }
            )
        }

        const existingRestaurant = await prisma.restaurant.findUnique({
            where: { id },
        })

        if (!existingRestaurant) {
            return NextResponse.json(
                { error: "Restaurant not found" },
                { status: 404 }
            )
        }

        const data = validationResult.data

        if (data.cuisineId) {
            const cuisineExists = await prisma.cuisine.findUnique({
                where: { id: data.cuisineId },
            })
            if (!cuisineExists) {
                return NextResponse.json(
                    { error: "Invalid cuisineId - cuisine not found" },
                    { status: 400 }
                )
            }
        }

        const restaurant = await prisma.restaurant.update({
            where: { id },
            data: {
                ...data,
                email: data.email || null,
                imageUrl: data.imageUrl || null,
            },
            include: {
                cuisine: true,
            },
        })

        return NextResponse.json(restaurant)
    } catch (error) {
        console.error("Failed to update restaurant:", error)
        return NextResponse.json(
            { error: "Failed to update restaurant" },
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

    if (session.user.role !== "ADMIN") {
        return NextResponse.json(
            { error: "Forbidden - Admin access required" },
            { status: 403 }
        )
    }

    try {
        const existingRestaurant = await prisma.restaurant.findUnique({
            where: { id },
        })

        if (!existingRestaurant) {
            return NextResponse.json(
                { error: "Restaurant not found" },
                { status: 404 }
            )
        }

        // Soft delete by setting isActive to false
        await prisma.restaurant.update({
            where: { id },
            data: { isActive: false },
        })

        return NextResponse.json({ message: "Restaurant deleted successfully" })
    } catch (error) {
        console.error("Failed to delete restaurant:", error)
        return NextResponse.json(
            { error: "Failed to delete restaurant" },
            { status: 500 }
        )
    }
}
