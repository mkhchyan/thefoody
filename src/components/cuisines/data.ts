import {
    ChefHat,
    Utensils,
    Coffee,
    Pizza,
    Salad,
    Cake,
} from "lucide-react";

export const cuisines = [
    {
        name: "Italian",
        icon: Pizza,
        color: "bg-red-100 text-red-600",
        slug: "italian",
    },
    {
        name: "Japanese",
        icon: Utensils,
        color: "bg-pink-100 text-pink-600",
        slug: "japanese",
    },
    {
        name: "American",
        icon: ChefHat,
        color: "bg-blue-100 text-blue-600",
        slug: "american",
    },
    {
        name: "Indian",
        icon: Salad,
        color: "bg-yellow-100 text-yellow-600",
        slug: "indian",
    },
    {
        name: "French",
        icon: Coffee,
        color: "bg-purple-100 text-purple-600",
        slug: "french",
    },
    {
        name: "Desserts",
        icon: Cake,
        color: "bg-green-100 text-green-600",
        slug: "desserts",
    },
];