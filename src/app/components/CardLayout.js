export default function CardLayout({ className, name, text, key }) {
  return (
    <div className={className}>
      <li key={key}>
        <h3 className="font-bold">{name}</h3>
        <p>{text}</p>
        <br />
        <hr />
      </li>
    </div>
  );
}
