import CardLayout from "./CardLayout";



export default function CardList({ cardData }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="">
        <div className="h-auto flex justify-center flex-wrap px-3">
          {cardData.map((card) => {
            return <CardLayout key={card.name} name={card.name} id={card.id} imageUri={card.imageUri} />;
          })}
        </div>
      </div>
    </div>
  );
}
