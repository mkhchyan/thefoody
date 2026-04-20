import { ContactInfo, TableList, BookingCTA } from "@/components/ui";

interface Table {
  id: string;
  tableNumber: string;
  capacity: number;
  isAvailable: boolean;
}

interface SidebarProps {
  address: string;
  city: string;
  phone: string | null;
  email: string | null;
  openingTime: string | null;
  closingTime: string | null;
  tables: Table[];
}

export function Sidebar({
  address,
  city,
  phone,
  email,
  openingTime,
  closingTime,
  tables,
}: SidebarProps) {
  return (
    <div className="space-y-6">
      <ContactInfo
        address={address}
        city={city}
        phone={phone}
        email={email}
        openingTime={openingTime}
        closingTime={closingTime}
      />
      <TableList tables={tables} />
      <BookingCTA />
    </div>
  );
}
