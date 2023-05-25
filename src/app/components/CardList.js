import React, { useState, useEffect } from "react";
import CardLayout from "./CardLayout";
import { useContext } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { AuthContext } from "../auth/AuthContext";

export default function CardList({ cardData }) {
  const ctx = useContext(AuthContext);
  const [favoritedCards, setFavoritedCards] = useState([]);
  const [overlayCard, setOverlayCard] = useState(null);

  const hideOverlay = () => {
    setOverlayCard(null);
  };

  const cardListMaker = () => {
    try {
      return cardData.map((card) => {
        const isFavorited = favoritedCards.includes(card.id);
        const isOverlay = overlayCard === card.id;

        return (
          <div key={card.name} className="relative flex flex-col ">
            <CardLayout
              AddToFavorites={AddToFavorites}
              key={card.name}
              name={card.name}
              id={card.id}
              imageUri={card.imageUri}
              onClick={() => setOverlayCard(card.id)}
              isOverlay={isOverlay}
              isFavorited={isFavorited}
              hideOverlay={hideOverlay}
            />
          </div>
        );
      });
    } catch (error) {
      console.error("An error occurred:", error);
      return <div className="text-red-600 my-12">Error: No Cards Found</div>;
    }
  };

  const cardList = cardListMaker();

  useEffect(() => {
    // reset the favoritedCards state when cardData changes
    setFavoritedCards([]);
    setOverlayCard(null);
  }, [cardData]);

  function AddToFavorites(name, id, imageUri) {
    const db = getDatabase();
    const user = ctx.user;
    const uid = user.uid;

    set(ref(db, "users/" + uid + "/favorites/" + id), {
      name: name,
      id: id,
      imageUri: imageUri,
    }).then(() => {
      console.log("Added to favorites: ", name, id, imageUri);
      setFavoritedCards((prevFavorites) => [...prevFavorites, id]);
    });
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="">
        <div className="h-auto flex justify-center flex-wrap mx-3">
          {cardList}
        </div>
      </div>
    </div>
  );
}
