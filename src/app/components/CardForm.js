import { useReducer, useRef } from "react";
import Select from "./UI/Inputs/Select";
import GetCards from "../utils/GetCards";
import { ref } from "firebase/database";

const initialState = {
  colorId: "",
  cardType: "",
  cardFunction: "",
  colorIdValid: false,
  cardTypeValid: false,
  colorIdTouched: false,
  cardTypeTouched: false,
  cardFunctionTouched: false,
  formValid: false,
  error: {
    general: "",
    color_id_error: "",
    card_type_error: "",
    card_function_error: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "COLORID_VALID":
      const colorIdIsValid =
        action.value.trim().length > 0 && action.value.trim().length < 20;
      return { ...state, colorIdValid: colorIdIsValid };

    case "CARDTYPE_VALID":
      const cardTypeIsValid =
        action.value.trim().length > 0 && action.value.trim().length < 20;
      return { ...state, cardTypeValid: cardTypeIsValid };

    case "SET_FIELD_TOUCHED_TRUE":
      return { ...state, [action.field]: true };

    case "SET_ERROR":
      return { ...state, error: action.error };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function CardForm({ onFormSubmit, submitRef }) {
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
    { name: "Battle", value: "Battle" },
  ];

  const cardFunctionOptions = [
    { name: "", value: "" },
    { name: "Removal", value: "removal" },
    { name: "Ramp", value: "ramp" },
  ];

  const handleColorIdBlur = () => {
    const colorId = colorIdRef.current.value;
    dispatch({ type: "SET_FIELD_TOUCHED_TRUE", field: "colorIdTouched" });
    dispatch({ type: "COLORID_VALID", value: colorId });
  };

  const handleCardTypeBlur = () => {
    const cardType = cardTypeRef.current.value;
    dispatch({ type: "SET_FIELD_TOUCHED_TRUE", field: "cardTypeTouched" });
    dispatch({ type: "CARDTYPE_VALID", value: cardType });
  };

  const handleCardFunctionBlur = () => {
    dispatch({ type: "SET_FIELD_TOUCHED_TRUE", field: "cardFunctionTouched" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const colorId = colorIdRef.current.value;
    const cardType = cardTypeRef.current.value;
    const cardFunction = cardFunctionRef.current.value;
    const formIsValid = state.colorIdValid && state.cardTypeValid;

    const formData = {
      color_id: colorId,
      card_type: cardType,
      card_function: cardFunction,
    };

    const sendForm = async () => {
      const data = await GetCards(formData, dispatch);
      onFormSubmit(data);
    };

    if (formIsValid) {
      sendForm();
    } else {
    }
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-2 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Card Parameters
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Enter the parameters for the cards you want to find.
          </p>
          <br />
          <p className="text-red-600">{state.error.general}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="color_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Color:
                </label>
                <div className="mt-2">
                  <Select
                    options={colorIdOptions}
                    className={
                      !state.colorIdValid &&
                      state.colorIdTouched &&
                      "bg-red-100"
                    }
                    onBlur={handleColorIdBlur}
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
                    onBlur={handleCardTypeBlur}
                    ref={cardTypeRef}
                    name="card_type"
                    id="card_type"
                    autoComplete="card_type"
                    placeholder="instant"
                    className={
                      !state.cardTypeValid &&
                      state.cardTypeTouched &&
                      "bg-red-100"
                    }
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
                    onBlur={handleCardFunctionBlur}
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
