export default async function GetData({
  color_id: colorId,
  card_type: cardType,
  page: page,
}) {
  const params = new URLSearchParams({
    q: `f:commander id:${colorId} ${colorId != "Colorless" ? "-c:c" : ""} t:${cardType} order:edhrec dir:asc`,
    page: `${page}`,
  });
  const url = `https://api.scryfall.com/cards/search?${params}`;

  async function fetcher(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  const cards = await fetcher(url);

  return cards.data;
}
