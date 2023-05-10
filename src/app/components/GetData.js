export default async function GetData({
  color_id: colorId,
  card_type: cardType,
  page: page,
}) {
  const params = new URLSearchParams({
    q: `f:commander id:${colorId} ${
      colorId != "Colorless" ? "-c:c" : ""
    } t:${cardType} order:edhrec dir:asc`,
    page: `${page}`,
  });
  const url = `https://api.scryfall.com/cards/search?${params}`;
  let uris = [];

  async function fetcher(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  const cards = await fetcher(url);

  const cardArray = cards.data.slice(0, 30);

console.log("Card Array", cardArray)

  cardArray.forEach((card) => {
    if (card.image_uris) {
      uris.push(card.image_uris.normal);
    } else {
      uris.push(card.card_faces[0].image_uris.normal);
    }
  });
  console.log("uris", uris)
  return {cardArray, uris};
}
