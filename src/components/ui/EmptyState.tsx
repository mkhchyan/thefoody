import Link from "next/link";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ message, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">{message}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="text-orange-600 hover:text-orange-700 font-medium mt-2 inline-block"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
