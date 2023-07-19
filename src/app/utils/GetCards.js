export default async function GetCards(
  { color_id: colorId, card_type: cardType, card_function: cardFunction },
  dispatch
) {
  const params = new URLSearchParams({
    q: `${colorId && "f:commander id<=" + colorId} ${
      colorId != "Colorless" ? "-c:c" : ""
    } ${cardType && "t:" + cardType} order:edhrec dir:asc ${
      cardFunction && "oracletag:" + cardFunction
    }`,
  });

  const url = `https://api.scryfall.com/cards/search?${params}`;

  async function fetcher(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data.data;
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: error });
    }
  }

  function selectRandomCards(array, numCards) {
    try {
      const randomSubset = [];

      for (let i = 0; i < numCards; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const selectedCard = array.splice(randomIndex, 1)[0];
        randomSubset.push(selectedCard);
      }
      return randomSubset;
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: error });
    }
  }

  const response = await fetcher(url);

  const randomCards = selectRandomCards(response, 24);

  const cardDataMaker = () => {
    try {
      const cardData = randomCards.map((card) => {
        const name = card.name;
        const id = card.id;
        let imageUri = "";

        if (card.image_uris) {
          imageUri = card.image_uris.normal;
        } else {
          imageUri = card.card_faces[0].image_uris.normal;
        }
        return { name, id, imageUri };
      });
      return cardData;
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: error });
    }
  };

  const cardData = cardDataMaker();

  return cardData;
}
