"use client"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function CardLayout({ name, id, imageUri }) {
  const ctx = useContext(AuthContext);

  const handleImgClick = () => {
    ctx.dispatch({ type: 'TEST', payload: name });
  };

  return (
    <>
      <div key={id} className="flex justify-center py-5">
        <img className="cursor-pointer" onClick={handleImgClick} height="75%" width="75%" src={imageUri} alt={name} />
        <br />
        <hr />
      </div>
    </>
  );
}
