import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const updateCuisineSchema = z.object({
    name: z.string().min(1).max(50).optional(),
    description: z.string().max(500).optional(),
    imageUrl: z.string().url().optional().or(z.literal("")),
})

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    try {
        const cuisine = await prisma.cuisine.findUnique({
            where: { id },
            include: {
                restaurants: {
                    where: { isActive: true },
                    orderBy: { rating: "desc" },
                },
            },
        })

        if (!cuisine) {
            return NextResponse.json(
                { error: "Cuisine not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(cuisine)
    } catch (error) {
        console.error("Failed to fetch cuisine:", error)
        return NextResponse.json(
            { error: "Failed to fetch cuisine" },
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

        const validationResult = updateCuisineSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validationResult.error.flatten() },
                { status: 400 }
            )
        }

        const existingCuisine = await prisma.cuisine.findUnique({
            where: { id },
        })

        if (!existingCuisine) {
            return NextResponse.json(
                { error: "Cuisine not found" },
                { status: 404 }
            )
        }

        const data = validationResult.data

        if (data.name && data.name !== existingCuisine.name) {
            const duplicateName = await prisma.cuisine.findUnique({
                where: { name: data.name },
            })
            if (duplicateName) {
                return NextResponse.json(
                    { error: "A cuisine with this name already exists" },
                    { status: 409 }
                )
            }
        }

        const cuisine = await prisma.cuisine.update({
            where: { id },
            data: {
                ...data,
                imageUrl: data.imageUrl || null,
            },
        })

        return NextResponse.json(cuisine)
    } catch (error) {
        console.error("Failed to update cuisine:", error)
        return NextResponse.json(
            { error: "Failed to update cuisine" },
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
        const existingCuisine = await prisma.cuisine.findUnique({
            where: { id },
            include: {
                _count: { select: { restaurants: true } },
            },
        })

        if (!existingCuisine) {
            return NextResponse.json(
                { error: "Cuisine not found" },
                { status: 404 }
            )
        }

        if (existingCuisine._count.restaurants > 0) {
            return NextResponse.json(
                { error: "Cannot delete cuisine with associated restaurants" },
                { status: 400 }
            )
        }

        await prisma.cuisine.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Cuisine deleted successfully" })
    } catch (error) {
        console.error("Failed to delete cuisine:", error)
        return NextResponse.json(
            { error: "Failed to delete cuisine" },
            { status: 500 }
        )
    }
}
