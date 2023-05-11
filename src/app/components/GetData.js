export default async function GetData({
  color_id: colorId,
  card_type: cardType,
}) {
  const params = new URLSearchParams({
    q: `f:commander id:${colorId} ${
      colorId != "Colorless" ? "-c:c" : ""
    } t:${cardType} order:edhrec dir:asc`,
  });
  const url = `https://api.scryfall.com/cards/search?${params}`;

  async function fetcher(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  }

  function selectRandomCards(array, numCards) {
    const randomSubset = [];

    for (let i = 0; i < numCards; i++) {
      const randomIndex = Math.floor(Math.random() * array.length);
      const selectedCard = array.splice(randomIndex, 1)[0];
      randomSubset.push(selectedCard);
    }
    return randomSubset;
  }

  const response = await fetcher(url);

  const randomCards = selectRandomCards(response, 25);

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
}
