import { prisma } from "@/lib/prisma";

export interface SearchParams {
    cuisine?: string;
    city?: string;
}

export interface FilterOption {
    value: string;
    label: string;
    href: string;
}

export interface PageData {
    restaurants: Array<{
        id: string;
        name: string;
        description: string | null;
        imageUrl: string | null;
        rating: number;
        city: string;
        priceRange: number | null;
        openingTime: string | null;
        closingTime: string | null;
        cuisine: { name: string } | null;
        _count: { reviews: number };
    }>;
    cuisineFilters: FilterOption[];
    cityFilters: FilterOption[];
    pageTitle: string;
}

export async function getRestaurantsPageData(
    params: SearchParams
): Promise<PageData> {
    const cuisineName = params.cuisine;
    const city = params.city;

    const restaurants = await prisma.restaurant.findMany({
        where: {
            isActive: true,
            ...(cuisineName && {
                cuisine: {
                    name: { equals: cuisineName, mode: "insensitive" },
                },
            }),
            ...(city && { city: { contains: city, mode: "insensitive" } }),
        },
        include: {
            cuisine: true,
            _count: {
                select: { reviews: true },
            },
        },
        orderBy: {
            rating: "desc",
        },
    });

    const cuisines = await prisma.cuisine.findMany({
        orderBy: { name: "asc" },
    });

    const cities = await prisma.restaurant.findMany({
        where: { isActive: true },
        select: { city: true },
        distinct: ["city"],
        orderBy: { city: "asc" },
    });

    const cuisineFilters = cuisines.map((c) => ({
        value: c.name,
        label: c.name,
        href: `/restaurants?cuisine=${c.name}`,
    }));

    const cityFilters = cities.map((c) => ({
        value: c.city,
        label: c.city,
        href: cuisineName
            ? `/restaurants?cuisine=${cuisineName}&city=${c.city}`
            : `/restaurants?city=${c.city}`,
    }));

    const pageTitle = cuisineName
        ? `${cuisineName} Restaurants`
        : city
            ? `Restaurants in ${city}`
            : "All Restaurants";

    return {
        restaurants,
        cuisineFilters,
        cityFilters,
        pageTitle,
    };
}
