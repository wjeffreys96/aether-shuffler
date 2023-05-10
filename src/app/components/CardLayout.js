export default function CardLayout({ name, id, img_uri }) {
  return (
    <>
      <div key={id}>
        <img height="75%" width="75%" src={img_uri} alt={name} />
        <br />
        <hr />
      </div>
    </>
  );
}
