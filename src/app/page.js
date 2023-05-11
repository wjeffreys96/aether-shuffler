"use client";
import { useState } from "react";
import CardForm from "./components/CardForm";
import CardList from "./components/CardList";

export default function Home() {
  const [cardData, setcardData] = useState([]);

  const onFormSubmit = (cardData) => {
    console.log("cardData in Page.js", cardData)
    setcardData(cardData);
  };

  return (
    <main className="w-full">
      <div className="flex content-center justify-center p-3">
        <CardForm onFormSubmit={onFormSubmit} />
      </div>

      <div className="flex content-center justify-center p-3">
        <CardList cardData={cardData} />
      </div>
    </main>
  );
}
