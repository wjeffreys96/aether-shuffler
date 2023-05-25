"use client";
import { useState, useRef } from "react";
import CardForm from "./components/CardForm";
import CardList from "./components/CardList";

export default function Home() {
  const [cardData, setcardData] = useState([]);
  const submitRef = useRef();

  const onFormSubmit = (cardData) => {
    setcardData(cardData);
  };

  return (
    <main className="w-full">
      <div className="flex content-center justify-center p-3">
        <CardForm submitRef={submitRef} onFormSubmit={onFormSubmit} />
      </div>

      <div className="flex content-center justify-center p-3">
        <CardList cardData={cardData} />
      </div>

      <div className='flex justify-center my-6'>      
        <button
        onClick={() => submitRef.current.click()}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Shuffle
      </button>
      </div>

    </main>
  );
}
