export default function EmptyState() {
  return (
    <div
      type="button"
      className=" flex flex-col justify-center relative  w-full rounded-lg border-2 border-dashed border-gray-300 mx-12 p-12 text-center"
    >
      <div className="flex items-center justify-center">
        <img
          src="../../assets/trading-card.png"
          alt="empty"
          className="h-16 w-16 contrast-0"
        />
      </div>
    </div>
  );
}
