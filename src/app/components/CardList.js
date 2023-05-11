import CardLayout from "./CardLayout";



export default function CardList({ cardData }) {
  console.log("CardData in CardList.js:", cardData);
  return (
    <div className="flex flex-col w-full h-full m-5">
      <div className="">
        <div className="h-auto flex flex-wrap justify-center px-3">
          {cardData.map((card) => {
            return <CardLayout key={card.name} name={card.name} id={card.id} imageUri={card.imageUri} />;
          })}
        </div>
      </div>
    </div>
  );
}
