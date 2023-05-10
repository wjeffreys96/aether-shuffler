"use client";
import { useState } from "react";
import CardForm from "./components/CardForm";
import CardList from "./components/CardList";

export default function Home() {
  const [cardArray, setCardArray] = useState([]);
  const reducedCards = cardArray.slice(0, 10);

  const handleCardSubmit = (cardArray) => {
    console.log(cardArray);
    setCardArray(cardArray);
  };

  return (
    <main className="w-full">

      <div className="flex content-center justify-center p-3">
        <CardForm onFormSubmit={handleCardSubmit} />
      </div>

      <CardList cardArray={reducedCards} />

    </main>
  );
}
