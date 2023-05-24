"use client"
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function CardLayout({ name, id, imageUri }) {
  const ctx = useContext(AuthContext);

  const handleImgClick = () => {};

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
