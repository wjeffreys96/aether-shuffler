"use client";
import { useState, useRef } from "react";
import CardForm from "./components/CardForm";
import CardList from "./components/CardList";
import EmptyState from "./components/EmptyState";
import Spinner from "./components/UI/Spinner";

export default function Home() {
  const [cardData, setcardData] = useState(null);
  const [displayCards, setDisplayCards] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitRef = useRef();

  const onFormSubmit = (cardData) => {
    setDisplayCards(true);
    setcardData(cardData);
  };

  return (
    <main className="min-h-custom flex flex-col justify-center">
      <div className="flex justify-center p-3">
        <CardForm
          submitRef={submitRef}
          setLoading={setLoading}
          onFormSubmit={onFormSubmit}
        />
      </div>

      <hr className="mx-24 my-6" />

      <div
        className={`${
          loading && "flex-col mx-auto"
        } flex justify-center p-3 grow`}
      >
        {loading ? (
          <Spinner />
        ) : displayCards ? (
          <CardList cardData={cardData} />
        ) : (
          <EmptyState />
        )}
      </div>
          <hr className="mx-24 my-6" />
      {cardData && (
        <>

          <div className="flex justify-center my-6">
            <button
              onClick={() => submitRef.current.click()}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Shuffle
            </button>
          </div>
        </>
      )}
    </main>
  );
}
