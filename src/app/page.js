"use client";
import { useState, useEffect } from "react";
import CardForm from "./components/CardForm";
import CardList from "./components/CardList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "./lib/firebase";

export default function Home() {
  const [cardData, setcardData] = useState([]);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is signed in", user);
      } else {
        console.log("user is not signed in");
      }
    }
    );
  }, []);

  const onFormSubmit = (cardData) => {
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
