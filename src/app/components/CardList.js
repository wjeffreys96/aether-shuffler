import CardLayout from "./CardLayout";

export default function CardList({ cardArray }) {
  return (
    <div className="flex flex-col w-full h-full m-5">
      <div className="flex justify-center ">
        <div className="w-1/2 h-auto px-3">
          <ul className="m-2 flex">
            {cardArray.map((card) => (
              <div>
                <CardLayout
                  name={card.name}
                  key={card.name}
                  text={card.oracle_text}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
