import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"

const createRestaurantSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    description: z.string().optional(),
    address: z.string().min(1, "Address is required").max(200),
    city: z.string().min(1, "City is required").max(100),
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    cuisineId: z.string().optional(),
    imageUrl: z.string().url().optional().or(z.literal("")),
    rating: z.number().min(0).max(5).default(0),
    priceRange: z.number().int().min(1).max(4).default(1),
    openingTime: z.string().optional(),
    closingTime: z.string().optional(),
    isActive: z.boolean().default(true),
})

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const cuisineId = searchParams.get("cuisineId")
    const city = searchParams.get("city")

    try {
        const restaurants = await prisma.restaurant.findMany({
            where: {
                isActive: true,
                ...(cuisineId && { cuisineId }),
                ...(city && { city: { contains: city, mode: "insensitive" } }),
            },
            include: {
                cuisine: true,
            },
            orderBy: {
                rating: "desc",
            },
        })

        return NextResponse.json(restaurants)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch restaurants" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== Role.ADMIN) {
        return NextResponse.json(
            { error: "Forbidden - Admin access required" },
            { status: 403 }
        )
    }

    try {
        const body = await request.json()

        const validationResult = createRestaurantSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validationResult.error.flatten() },
                { status: 400 }
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

        const restaurant = await prisma.restaurant.create({
            data: {
                ...data,
                email: data.email || null,
                imageUrl: data.imageUrl || null,
            },
            include: {
                cuisine: true,
            },
        })

        return NextResponse.json(restaurant, { status: 201 })
    } catch (error) {
        console.error("Failed to create restaurant:", error)
        return NextResponse.json(
            { error: "Failed to create restaurant" },
            { status: 500 }
        )
    }
}