export function getPriceLabel(priceRange: number): string {
  return "$".repeat(priceRange);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

/**
 * Generates initials from a name
 * @param name - Full name string
 * @returns First character of the name, uppercase
 */
export function getInitials(name: string | null | undefined): string {
  return name?.charAt(0).toUpperCase() ?? "U";
}
