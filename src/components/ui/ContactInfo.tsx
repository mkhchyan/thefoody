import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface ContactInfoProps {
  address: string;
  city: string;
  phone?: string | null;
  email?: string | null;
  openingTime?: string | null;
  closingTime?: string | null;
}

export function ContactInfo({
  address,
  city,
  phone,
  email,
  openingTime,
  closingTime,
}: ContactInfoProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Contact & Location
      </h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-gray-900">{address}</p>
            <p className="text-gray-600">{city}</p>
          </div>
        </div>
        {phone && (
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-orange-600" />
            <a
              href={`tel:${phone}`}
              className="text-gray-900 hover:text-orange-600 transition-colors"
            >
              {phone}
            </a>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-orange-600" />
            <a
              href={`mailto:${email}`}
              className="text-gray-900 hover:text-orange-600 transition-colors"
            >
              {email}
            </a>
          </div>
        )}
        {openingTime && closingTime && (
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-gray-900">
              {openingTime} - {closingTime}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
