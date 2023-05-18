import { useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { firebaseApp } from "@/app/lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Page() {
    const ctx = useContext(AuthContext);
    const auth = getAuth(firebaseApp);
}
