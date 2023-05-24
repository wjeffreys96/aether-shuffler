"use client";
import { useState, useContext, useEffect } from "react";
import CardForm from "./components/CardForm";
import CardList from "./components/CardList";
import { AuthContext } from "./auth/AuthContext";


export default function Home() {
  const [cardData, setcardData] = useState([]);


  const onFormSubmit = (cardData) => {
    setcardData(cardData);
  };

  const ctx = useContext(AuthContext);

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
