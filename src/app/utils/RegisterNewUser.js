import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterNewUser(
  auth,
  email,
  password,
  username,
  ctx,
  router
) {
  const db = getDatabase();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const uid = user.uid;
      ctx.dispatch({ type: "SETUSER", payload: user });
      set(ref(db, "users/" + uid), {
        username: username,
      });
      router.push("/dashboard");
    })
    .catch((error) => {
      const errorMessage = error.message;
      dispatch({ type: "SET_ERROR", error: errorMessage });
    });
}
