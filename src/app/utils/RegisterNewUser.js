import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterNewUser(
  auth,
  email,
  password,
  username,
  ctx,
  router,
  dispatch
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
      if (error.code === "auth/email-already-in-use") {
        dispatch({
          type: "SET_ERROR_GENERAL",
          value: "That email is already in use",
        });
      }
    });
}
