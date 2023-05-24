"use client";
import CardLayout from "./CardLayout";
import { useContext } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { AuthContext } from "../auth/AuthContext";

export default function CardList({ cardData }) {
  const ctx = useContext(AuthContext);
  function AddToFavorites(name, id, imageUri) {
    const db = getDatabase();
    const user = ctx.user;
    const uid = user.uid;
    set(ref(db, "users/" + uid + "/favorites/" + id), {
      name: name,
      id: id,
      imageUri: imageUri,
    });
    console.log("Added to favorites: ", name, id, imageUri);
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="">
        <div className="h-auto flex justify-center flex-wrap px-3">
          {cardData.map((card) => {
            return (
              <div key={card.name} className="flex flex-col ">
                <CardLayout
                  key={card.name}
                  name={card.name}
                  id={card.id}
                  imageUri={card.imageUri}
                />
                <div className="flex justify-center">
                  <button
                    key={card.name}
                    className="bg-blue-500 hover:bg-blue-700 w-1/3 mx-3 text-white text-sm font-bold rounded"
                    onClick={() =>
                      AddToFavorites(card.name, card.id, card.imageUri)
                    }
                  >
                    + Add to Favorites
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
