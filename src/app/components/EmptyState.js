export default function EmptyState() {
  return (
    <div
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 mx-12 p-12 text-center"
    >
      <div className="flex justify-center">
        <span className="contrast-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </span>
        <img
          src="../../assets/trading-card.png"
          alt="empty"
          className="h-12 w-12 contrast-0"
        />
      </div>
    </div>
  );
}
