export const BookingCTA = ({ onBook }: { onBook?: () => void }) => {
  return (
    <div className="bg-linear-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
      <h3 className="text-lg font-bold mb-2">Ready to dine?</h3>
      <p className="text-white/90 mb-4">
        Book your table now and enjoy an amazing dining experience.
      </p>
      <button
        onClick={onBook}
        className="w-full bg-white text-orange-600 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors"
      >
        Book a Table
      </button>
    </div>
  );
};

export default BookingCTA;
