import CardLayout from "./CardLayout";

export default function CardList({ image_uris }) {
  console.log("CardList", image_uris);
  return (
    <div className="flex flex-col w-full h-full m-5">
      <div className="">
        <div className="h-auto flex flex-wrap justify-center px-3">
          {image_uris.map((card) => {
            return <CardLayout key={Math.random()} img_uri={card} />;
          })}
        </div>
      </div>
    </div>
  );
}
