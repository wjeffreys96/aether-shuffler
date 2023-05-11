export default function CardLayout({ name, id, imageUri }) {
  const handleImgClick = () => {
    console.log("CardLayout", name, id, imageUri);
  };

  return (
    <>
      <div key={id}>
        <img className="cursor-pointer" onClick={handleImgClick} height="75%" width="75%" src={imageUri} alt={name} />
        <br />
        <hr />
      </div>
    </>
  );
}
