export default function CardLayout({name, text }) {
  return (
    <div>
      <li key={name}>
        <h3 className="font-bold">{name}</h3>
        <p>{text}</p>
        <br />
        <hr />
      </li>
    </div>
  );
}
