export default function GetData(colorId, cardType, page) {
  const params = {
    q: `f:commander ci:${colorId} t:${cardType} order:edhrec dir:asc`,
    page: `${page}`,
  };
  const url = `https://api.scryfall.com/cards/search?${new URLSearchParams(
    params
  )}`;

  async function fetcher(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  const cards = fetcher(url);
  return cards;
}
