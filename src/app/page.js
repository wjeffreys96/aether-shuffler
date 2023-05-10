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

      <div className="flex flex-col w-full h-full m-5">
        <div className="flex justify-center ">
          <div className="w-1/2 h-auto px-3">
            <ul className="m-2">
              {reducedCards.map((card) => (
                <li key={card.name}>
                  <h3 className="font-bold">{card.name}</h3> 
                  <p>{card.oracle_text}</p>
                  <br />
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </main>
  );
}
