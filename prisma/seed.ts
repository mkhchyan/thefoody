import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("Starting seed...")

    await prisma.review.deleteMany()
    await prisma.booking.deleteMany()
    await prisma.table.deleteMany()
    await prisma.restaurant.deleteMany()
    await prisma.cuisine.deleteMany()
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    await prisma.user.deleteMany()

    console.log("Cleared existing data")

    const hashedPassword = await bcrypt.hash("password123", 10)

    const adminUser = await prisma.user.create({
        data: {
            email: "admin@thefoody.com",
            name: "Admin User",
            password: hashedPassword,
            role: "ADMIN",
            emailVerified: new Date(),
        },
    })

    const testUser1 = await prisma.user.create({
        data: {
            email: "john@example.com",
            name: "John Doe",
            password: hashedPassword,
            role: "USER",
            emailVerified: new Date(),
        },
    })

    const testUser2 = await prisma.user.create({
        data: {
            email: "jane@example.com",
            name: "Jane Smith",
            password: hashedPassword,
            role: "USER",
            emailVerified: new Date(),
        },
    })

    const cuisines = await Promise.all([
        prisma.cuisine.create({
            data: {
                name: "Italian",
                description: "Classic Italian cuisine with pasta, pizza, and Mediterranean flavors",
                imageUrl: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800",
            },
        }),
        prisma.cuisine.create({
            data: {
                name: "Japanese",
                description: "Traditional and modern Japanese dishes including sushi, ramen, and izakaya fare",
                imageUrl: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800",
            },
        }),
        prisma.cuisine.create({
            data: {
                name: "Mexican",
                description: "Vibrant Mexican cuisine with tacos, burritos, and authentic regional dishes",
                imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
            },
        }),
        prisma.cuisine.create({
            data: {
                name: "Indian",
                description: "Rich and aromatic Indian cuisine with curries, tandoori, and regional specialties",
                imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
            },
        }),
        prisma.cuisine.create({
            data: {
                name: "Chinese",
                description: "Diverse Chinese cuisine from Cantonese dim sum to Sichuan spice",
                imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
            },
        }),
        prisma.cuisine.create({
            data: {
                name: "French",
                description: "Elegant French cuisine with classic techniques and refined flavors",
                imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
            },
        }),
        prisma.cuisine.create({
            data: {
                name: "American",
                description: "Classic American comfort food, steakhouses, and modern American cuisine",
                imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
            },
        }),
        prisma.cuisine.create({
            data: {
                name: "Thai",
                description: "Bold Thai flavors with perfect balance of sweet, sour, salty, and spicy",
                imageUrl: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800",
            },
        }),
    ])

    const restaurants = await Promise.all([
        // Italian restaurants
        prisma.restaurant.create({
            data: {
                name: "La Bella Italia",
                description: "Authentic Italian trattoria serving homemade pasta and wood-fired pizzas in a cozy atmosphere.",
                address: "123 Main Street",
                city: "New York",
                phone: "+1-212-555-0101",
                email: "info@labellaitalia.com",
                cuisineId: cuisines[0].id,
                imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
                rating: 4.5,
                priceRange: 3,
                openingTime: "11:00",
                closingTime: "23:00",
                isActive: true,
            },
        }),
        prisma.restaurant.create({
            data: {
                name: "Pasta Paradise",
                description: "Fresh pasta made daily with ingredients imported from Italy.",
                address: "456 Oak Avenue",
                city: "Los Angeles",
                phone: "+1-310-555-0102",
                email: "hello@pastaparadise.com",
                cuisineId: cuisines[0].id,
                imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
                rating: 4.3,
                priceRange: 2,
                openingTime: "12:00",
                closingTime: "22:00",
                isActive: true,
            },
        }),
        // Japanese restaurants
        prisma.restaurant.create({
            data: {
                name: "Sakura Sushi",
                description: "Premium sushi and sashimi prepared by master chefs with the freshest fish.",
                address: "789 Cherry Lane",
                city: "New York",
                phone: "+1-212-555-0103",
                email: "reservations@sakurasushi.com",
                cuisineId: cuisines[1].id,
                imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
                rating: 4.8,
                priceRange: 4,
                openingTime: "17:00",
                closingTime: "23:00",
                isActive: true,
            },
        }),
        prisma.restaurant.create({
            data: {
                name: "Ramen House",
                description: "Authentic Japanese ramen with rich broths simmered for 24 hours.",
                address: "321 Noodle Street",
                city: "San Francisco",
                phone: "+1-415-555-0104",
                cuisineId: cuisines[1].id,
                imageUrl: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800",
                rating: 4.4,
                priceRange: 2,
                openingTime: "11:30",
                closingTime: "21:30",
                isActive: true,
            },
        }),
        // Mexican restaurants
        prisma.restaurant.create({
            data: {
                name: "El Mariachi",
                description: "Traditional Mexican cuisine with family recipes passed down for generations.",
                address: "555 Fiesta Road",
                city: "Los Angeles",
                phone: "+1-310-555-0105",
                email: "hola@elmariachi.com",
                cuisineId: cuisines[2].id,
                imageUrl: "https://images.unsplash.com/photo-1653245037498-cf2e4d7d8ab4?w=800",
                rating: 4.2,
                priceRange: 2,
                openingTime: "10:00",
                closingTime: "22:00",
                isActive: true,
            },
        }),
        // Indian restaurants
        prisma.restaurant.create({
            data: {
                name: "Taj Mahal Palace",
                description: "Fine Indian dining with regional specialties from across the subcontinent.",
                address: "888 Spice Avenue",
                city: "Chicago",
                phone: "+1-312-555-0106",
                email: "namaste@tajmahalpalace.com",
                cuisineId: cuisines[3].id,
                imageUrl: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800",
                rating: 4.6,
                priceRange: 3,
                openingTime: "11:00",
                closingTime: "22:30",
                isActive: true,
            },
        }),
        // Chinese restaurants
        prisma.restaurant.create({
            data: {
                name: "Golden Dragon",
                description: "Cantonese dim sum and Sichuan specialties in an elegant setting.",
                address: "168 Fortune Street",
                city: "San Francisco",
                phone: "+1-415-555-0107",
                cuisineId: cuisines[4].id,
                imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
                rating: 4.3,
                priceRange: 2,
                openingTime: "10:00",
                closingTime: "22:00",
                isActive: true,
            },
        }),
        // French restaurants
        prisma.restaurant.create({
            data: {
                name: "Le Petit Bistro",
                description: "Classic French bistro cuisine with an extensive wine selection.",
                address: "42 Rue de Paris",
                city: "New York",
                phone: "+1-212-555-0108",
                email: "bonjour@lepetitbistro.com",
                cuisineId: cuisines[5].id,
                imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
                rating: 4.7,
                priceRange: 4,
                openingTime: "18:00",
                closingTime: "23:00",
                isActive: true,
            },
        }),
        // American restaurants
        prisma.restaurant.create({
            data: {
                name: "The Great American Grill",
                description: "Premium steaks and classic American dishes in a modern setting.",
                address: "1776 Liberty Lane",
                city: "Chicago",
                phone: "+1-312-555-0109",
                email: "info@greatamericangrill.com",
                cuisineId: cuisines[6].id,
                imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
                rating: 4.4,
                priceRange: 3,
                openingTime: "11:00",
                closingTime: "23:00",
                isActive: true,
            },
        }),
        // Thai restaurants
        prisma.restaurant.create({
            data: {
                name: "Bangkok Street Kitchen",
                description: "Authentic Thai street food and regional specialties.",
                address: "99 Lotus Lane",
                city: "Los Angeles",
                phone: "+1-310-555-0110",
                cuisineId: cuisines[7].id,
                imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800",
                rating: 4.5,
                priceRange: 2,
                openingTime: "11:00",
                closingTime: "21:30",
                isActive: true,
            },
        }),
    ])

    for (const restaurant of restaurants) {
        await prisma.table.createMany({
            data: [
                { restaurantId: restaurant.id, tableNumber: "T1", capacity: 2, isAvailable: true },
                { restaurantId: restaurant.id, tableNumber: "T2", capacity: 2, isAvailable: true },
                { restaurantId: restaurant.id, tableNumber: "T3", capacity: 4, isAvailable: true },
                { restaurantId: restaurant.id, tableNumber: "T4", capacity: 4, isAvailable: true },
                { restaurantId: restaurant.id, tableNumber: "T5", capacity: 6, isAvailable: true },
                { restaurantId: restaurant.id, tableNumber: "T6", capacity: 8, isAvailable: true },
            ],
        })
    }

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(19, 0, 0, 0)

    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    nextWeek.setHours(20, 0, 0, 0)

    const bookings = await Promise.all([
        prisma.booking.create({
            data: {
                userId: testUser1.id,
                restaurantId: restaurants[0].id,
                bookingDate: tomorrow,
                bookingTime: "19:00",
                partySize: 2,
                status: "confirmed",
                specialRequests: "Window seat if possible",
            },
        }),
        prisma.booking.create({
            data: {
                userId: testUser1.id,
                restaurantId: restaurants[2].id,
                bookingDate: nextWeek,
                bookingTime: "20:00",
                partySize: 4,
                status: "pending",
            },
        }),
        prisma.booking.create({
            data: {
                userId: testUser2.id,
                restaurantId: restaurants[5].id,
                bookingDate: tomorrow,
                bookingTime: "18:30",
                partySize: 2,
                status: "confirmed",
                specialRequests: "Celebrating anniversary",
            },
        }),
    ])

    await Promise.all([
        prisma.review.create({
            data: {
                userId: testUser1.id,
                restaurantId: restaurants[0].id,
                rating: 5,
                comment: "Amazing authentic Italian food! The pasta was perfectly cooked and the service was excellent.",
            },
        }),
        prisma.review.create({
            data: {
                userId: testUser2.id,
                restaurantId: restaurants[0].id,
                rating: 4,
                comment: "Great atmosphere and delicious food. A bit pricey but worth it for special occasions.",
            },
        }),
        prisma.review.create({
            data: {
                userId: testUser1.id,
                restaurantId: restaurants[2].id,
                rating: 5,
                comment: "Best sushi I've ever had! The fish is incredibly fresh and the presentation is beautiful.",
            },
        }),
        prisma.review.create({
            data: {
                userId: testUser2.id,
                restaurantId: restaurants[5].id,
                rating: 5,
                comment: "Outstanding Indian cuisine. The butter chicken and naan were absolutely divine!",
            },
        }),
        prisma.review.create({
            data: {
                userId: testUser1.id,
                restaurantId: restaurants[7].id,
                rating: 4,
                comment: "Excellent French bistro. The coq au vin was perfect and the wine selection is impressive.",
            },
        }),
    ])

    console.log({
        users: 3,
        cuisines: cuisines.length,
        restaurants: restaurants.length,
        tables: restaurants.length * 6,
        bookings: bookings.length,
        reviews: 5,
    })
}

main()
    .catch((e) => {
        console.error("Seed error:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
