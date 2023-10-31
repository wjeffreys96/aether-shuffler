import React, { useState, useEffect } from "react";
import CardLayout from "./CardLayout";
import { useContext } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { AuthContext } from "../auth/AuthContext";

export default function CardList({ cardData }) {
  const ctx = useContext(AuthContext);
  const [favoritedCards, setFavoritedCards] = useState([]);
  const [overlayCard, setOverlayCard] = useState(null);
  const [error, setError] = useState(false);

  const hideOverlay = () => {
    setOverlayCard(null);
  };

  const cardListMaker = () => {
    if (cardData) {
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
        return <div className="text-red-600 my-12">Error: No Cards Found</div>;
      }
    } else {
      return <div className="text-red-600 my-12">No Cards Found!</div>;
    }
  };

  const cardList = cardListMaker();

  useEffect(() => {
    // reset the favoritedCards state when cardData changes
    setFavoritedCards([]);
    setOverlayCard(null);
  }, [cardData]);

  function AddToFavorites(name, id, imageUri) {
    try {
      const db = getDatabase();
      const user = ctx.user;
      const uid = user.uid;
      set(ref(db, "users/" + uid + "/favorites/" + id), {
        name: name,
        id: id,
        imageUri: imageUri,
      }).then(() => {
        setFavoritedCards((prevFavorites) => [...prevFavorites, id]);
      });
    } catch (error) {
      if (error.message === "Cannot read properties of null (reading 'uid')"  || "user is null") {
        setError("Please sign in to add cards to favorites.");
      } else {
        setError(error.message);
      }
    }
  }

  return (
    <div className="flexflex-col w-full h-full">
      {error && (
        <div className="text-red-500 flex justify-center w-full">{error}</div>
      )}
      <div>
        <div className={`h-auto flex flex-wrap mx-3 justify-center`}>
          {cardList}
        </div>
      </div>
    </div>
  );
}
