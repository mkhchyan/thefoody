import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function isAdmin() {
    const session = await getServerSession(authOptions)
    return session?.user?.role === Role.ADMIN
}

export async function requireAuth() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        throw new Error("Unauthorized")
    }
    return session
}

export async function requireAdmin() {
    const session = await requireAuth()
    if (session.user.role !== Role.ADMIN) {
        throw new Error("Forbidden - Admin access required")
    }
    return session
}