"use client";
import { useState } from "react";
import CardForm from "./components/CardForm";
import CardList from "./components/CardList";

export default function Home() {
  const [cardArray, setCardArray] = useState([]);
  const [image_uris, setImg_uris] = useState([]);

  const onFormSubmit = (cardArray) => {
    console.log("CardArray Page",cardArray.cardArray)
    console.log("Uris Page", cardArray.uris)
    setCardArray(cardArray.CardArray);
    setImg_uris(cardArray.uris)
  };

  return (
    <main className="w-full">
      <div className="flex content-center justify-center p-3">
        <CardForm onFormSubmit={onFormSubmit} />
      </div>

      <div className="flex content-center justify-center p-3">
        <CardList image_uris={image_uris} cardArray={cardArray} />
      </div>
    </main>
  );
}
