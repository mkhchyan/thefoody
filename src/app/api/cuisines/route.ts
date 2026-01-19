import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const createCuisineSchema = z.object({
    name: z.string().min(1, "Name is required").max(50),
    description: z.string().max(500).optional(),
    imageUrl: z.string().url().optional().or(z.literal("")),
})

export async function GET() {
    try {
        const cuisines = await prisma.cuisine.findMany({
            include: {
                _count: {
                    select: { restaurants: true },
                },
            },
            orderBy: {
                name: "asc",
            },
        })

        return NextResponse.json(cuisines)
    } catch (error) {
        console.error("Failed to fetch cuisines:", error)
        return NextResponse.json(
            { error: "Failed to fetch cuisines" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

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

        const validationResult = createCuisineSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validationResult.error.flatten() },
                { status: 400 }
            )
        }

        const data = validationResult.data

        const existingCuisine = await prisma.cuisine.findUnique({
            where: { name: data.name },
        })

        if (existingCuisine) {
            return NextResponse.json(
                { error: "A cuisine with this name already exists" },
                { status: 409 }
            )
        }

        const cuisine = await prisma.cuisine.create({
            data: {
                ...data,
                imageUrl: data.imageUrl || null,
            },
        })

        return NextResponse.json(cuisine, { status: 201 })
    } catch (error) {
        console.error("Failed to create cuisine:", error)
        return NextResponse.json(
            { error: "Failed to create cuisine" },
            { status: 500 }
        )
    }
}
