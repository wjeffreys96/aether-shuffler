export default function CardLayout({ name, id, imageUri, onClick, isOverlay, isFavorited, hideOverlay, AddToFavorites }) {
  const handleOverlayClick = (event) => {
    event.stopPropagation();
    hideOverlay();
  };

  return (
    <>
      <div key={id} className="flex justify-center my-5">
        <img className="cursor-pointer" onClick={onClick} height="75%" width="75%" src={imageUri} alt={name} />
        {isOverlay && (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full" onClick={handleOverlayClick}>
            <button
              className='w-24 h-24 flex items-center justify-center opacity-50 hover:opacity-75 rounded-full bg-black'
              onClick={(event) => {
                event.stopPropagation();
                AddToFavorites(name, id, imageUri);
              }}
            >
              <span className="text-white text-base">
                {isFavorited ? '✔' : '+'}
              </span>
            </button>
          </div>
        )}
        <br />
        <hr />
      </div>
    </>
  );
}
