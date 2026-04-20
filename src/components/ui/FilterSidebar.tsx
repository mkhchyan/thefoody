import Link from "next/link";

interface FilterOption {
  value: string;
  label: string;
  href: string;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  activeValue?: string | null;
  allLabel: string;
  allHref: string;
}

function FilterGroup({
  title,
  options,
  activeValue,
  allLabel,
  allHref,
}: FilterGroupProps) {
  return (
    <div className="mb-6 last:mb-0">
      <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
      <div className="space-y-2">
        <Link
          href={allHref}
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            !activeValue
              ? "bg-orange-100 text-orange-700 font-medium"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {allLabel}
        </Link>
        {options.map((option) => (
          <Link
            key={option.value}
            href={option.href}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              activeValue?.toLowerCase() === option.value.toLowerCase()
                ? "bg-orange-100 text-orange-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

interface FilterSidebarProps {
  filters: FilterGroupProps[];
}

export function FilterSidebar({ filters }: FilterSidebarProps) {
  return (
    <aside className="lg:w-64 shrink-0">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
        {filters.map((filter, index) => (
          <FilterGroup key={index} {...filter} />
        ))}
      </div>
    </aside>
  );
}
