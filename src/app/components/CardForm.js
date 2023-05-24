"use client";

import { useReducer, useRef } from "react";
import Select from "./UI/Inputs/Select";
import GetCards from "../utils/GetCards";

const initialState = {
  colorId: "",
  cardType: "",
  colorIdValid: false,
  cardTypeValid: false,
  colorIdTouched: false,
  cardTypeTouched: false,
  formValid: false,
  error: {
    general: "",
    color_id_error: "",
    card_type_error: "",
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

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function CardForm({ onFormSubmit }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const colorIdRef = useRef(null);
  const cardTypeRef = useRef(null);

  const cardTypeOptions = [
    { name: "", value: "" },
    { name: "Artifact", value: "Artifact" },
    { name: "Enchantment", value: "Enchantment" },
    { name: "Creature", value: "Creature" },
    { name: "Instant", value: "Instant" },
    { name: "Sorcery", value: "Sorcery" },
    { name: "Planeswalker", value: "Planeswalker" },
  ];

  const colorIdOptions = [
    { name: "", value: "" },
    { name: "White", value: "White" },
    { name: "Blue", value: "Blue" },
    { name: "Black", value: "Black" },
    { name: "Red", value: "Red" },
    { name: "Green", value: "Green" },
    { name: "Colorless", value: "Colorless" },
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const colorId = colorIdRef.current.value;
    const cardType = cardTypeRef.current.value;
    const formIsValid =
      state.colorIdValid && state.cardTypeValid
    const info = {
      color_id: colorId,
      card_type: cardType,
    };

    const sendForm = async () => {
      const data = await GetCards(info);
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
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
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
