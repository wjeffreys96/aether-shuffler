export default function EmptyState() {
  return (
    <div
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 mx-12 p-12 text-center"
    >
      <div className="flex justify-center">
        <img
          src="../../assets/trading-card.png"
          alt="empty"
          className="h-12 w-12 contrast-0"
        />
      </div>
    </div>
  );
}
