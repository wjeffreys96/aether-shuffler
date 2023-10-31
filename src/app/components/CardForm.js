import { useReducer, useRef } from "react";
import Select from "./UI/Inputs/Select";
import GetCards from "../utils/GetCards";

const initialState = {
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.error };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function CardForm({ onFormSubmit, submitRef, setLoading }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const colorIdRef = useRef(null);
  const cardTypeRef = useRef(null);
  const cardFunctionRef = useRef(null);

  const colorIdOptions = [
    { name: "", value: "" },
    { name: "White", value: "White" },
    { name: "Blue", value: "Blue" },
    { name: "Black", value: "Black" },
    { name: "Red", value: "Red" },
    { name: "Green", value: "Green" },
    { name: "Colorless", value: "Colorless" },
    { name: "Azorius (White/Blue)", value: "Azorius" },
    { name: "Dimir (Blue/Black)", value: "Dimir" },
    { name: "Rakdos (Black/Red)", value: "Rakdos" },
    { name: "Gruul (Red/Green)", value: "Gruul" },
    { name: "Selesnya (White/Green)", value: "Selesnya" },
    { name: "Orzhov (White/Black)", value: "Orzhov" },
    { name: "Izzet (Blue/Red)", value: "Izzet" },
    { name: "Golgari (Black/Green)", value: "Golgari" },
    { name: "Boros (White/Red)", value: "Boros" },
    { name: "Simic (Blue/Green)", value: "Simic" },
    { name: "Esper (White/Blue/Black)", value: "Esper" },
    { name: "Grixis (Blue/Black/Red)", value: "Grixis" },
    { name: "Jund (Black/Red/Green)", value: "Jund" },
    { name: "Naya (Red/Green/White)", value: "Naya" },
    { name: "Bant (Green/White/Blue)", value: "Bant" },
    { name: "Abzan (White/Black/Green)", value: "Abzan" },
    { name: "Jeskai (Blue/Red/White)", value: "Jeskai" },
    { name: "Sultai (Black/Green/Blue)", value: "Sultai" },
    { name: "Mardu (Red/White/Black)", value: "Mardu" },
    { name: "Temur (Green/Blue/Red)", value: "Temur" },
    { name: "Glint-Eye (Blue/Red/Green/Black)", value: "Glint-Eye" },
    { name: "Dune-Brood (Red/Green/White/Black)", value: "Dune-Brood" },
    { name: "Ink-Treader (Green/White/Blue/Red)", value: "Ink-Treader" },
    { name: "Witch-Maw (White/Blue/Black/Green)", value: "Witch-Maw" },
    { name: "Yore-Tiller (Blue/Black/Red/White)", value: "Yore-Tiller" },
    { name: "WUBRG (All Colors)", value: "WUBRG" },
  ];

  const cardTypeOptions = [
    { name: "", value: "" },
    { name: "Artifact", value: "Artifact" },
    { name: "Enchantment", value: "Enchantment" },
    { name: "Creature", value: "Creature" },
    { name: "Instant", value: "Instant" },
    { name: "Sorcery", value: "Sorcery" },
    { name: "Planeswalker", value: "Planeswalker" },
  ];

  const cardFunctionOptions = [
    { name: "", value: "" },
    { name: "Removal", value: "removal" },
    { name: "Ramp", value: "ramp" },
    { name: "Board Wipe", value: "wipe" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const colorId = colorIdRef.current.value;
    const cardType = cardTypeRef.current.value;
    const cardFunction = cardFunctionRef.current.value;

    const formData = {
      color_id: colorId,
      card_type: cardType,
      card_function: cardFunction,
    };

    const sendForm = async () => {
      const data = await GetCards(formData, dispatch);
      onFormSubmit(data);
    };

      sendForm()
      setLoading(false);

  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-2 pt-10 md:grid-cols-3 lg:mx-24">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Card Search
          </h2>
          <p className="text-sm leading-6 text-gray-600 my-6">
            Welcome to AetherShuffler! This app helps you find new Magic: The Gathering cards.
            <br />
            <br />
             To begin, enter parameters for the kinds of cards you wish to find. You can search
            by any combination of color identity, type, or function, or enter nothing to find completely random cards!
            <br />
            <br />
            If you create an account, you can favorite any card you've found by tapping/clicking on the card and pressing the plus button. Favorites can be viewed and managed by clicking on your
            profile picture in the top right and selecting "Favorites".
          </p>
          {state.error && (
            <p className="text-red-600">{state.error}</p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="color_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Color Identity:
                </label>
                <div className="mt-2">
                  <Select
                    options={colorIdOptions}
                    ref={colorIdRef}
                    name="color_id"
                    id="color_id"
                    autoComplete="color_id"
                    placeholder="red"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="card_type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Card Type:
                </label>
                <div className="mt-2">
                  <Select
                    options={cardTypeOptions}
                    ref={cardTypeRef}
                    name="card_type"
                    id="card_type"
                    autoComplete="card_type"
                    placeholder="instant"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="card_function"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Card Function:
                </label>
                <div className="mt-2">
                  <Select
                    options={cardFunctionOptions}
                    ref={cardFunctionRef}
                    name="card_function"
                    id="card_function"
                    autoComplete="card_function"
                    placeholder="function"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              role="submit"
              ref={submitRef}
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Shuffle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
