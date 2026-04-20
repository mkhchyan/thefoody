import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export interface RestaurantDetail {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  rating: number;
  priceRange: number;
  address: string;
  city: string;
  phone: string | null;
  email: string | null;
  openingTime: string | null;
  closingTime: string | null;
  cuisine: {
    id: string;
    name: string;
  } | null;
  reviews: Array<{
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    user: {
      name: string | null;
      image: string | null;
    };
  }>;
  tables: Array<{
    id: string;
    tableNumber: string;
    capacity: number;
    isAvailable: boolean;
  }>;
  _count: {
    reviews: number;
  };
}

export async function getRestaurantDetail(
  id: string
): Promise<RestaurantDetail | null> {
  return prisma.restaurant.findUnique({
    where: { id, isActive: true },
    include: {
      cuisine: {
        select: { id: true, name: true },
      },
      reviews: {
        include: {
          user: {
            select: { name: true, image: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      tables: {
        where: { isAvailable: true },
        orderBy: { capacity: "asc" },
      },
      _count: {
        select: { reviews: true },
      },
    },
  }) as Promise<RestaurantDetail | null>;
}

export async function generateRestaurantMetadata(
  id: string
): Promise<Metadata> {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
    select: { name: true, description: true },
  });

  if (!restaurant) {
    return { title: "Restaurant Not Found - TheFoody" };
  }

  return {
    title: `${restaurant.name} - TheFoody`,
    description:
      restaurant.description || `Book a table at ${restaurant.name}`,
  };
}

export function getPriceLabel(priceRange: number): string {
  return "$".repeat(Math.max(1, Math.min(4, priceRange)));
}
