import { Users } from "lucide-react";

interface Table {
  id: string;
  tableNumber: string;
  capacity: number;
}

interface TableListProps {
  tables: Table[];
}

export function TableList({ tables }: TableListProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Available Tables</h3>
      {tables.length === 0 ? (
        <p className="text-gray-500">No tables available.</p>
      ) : (
        <div className="space-y-3">
          {tables.map((table) => (
            <div
              key={table.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  {table.tableNumber}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{table.capacity} guests</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
