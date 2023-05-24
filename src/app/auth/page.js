"use client";
import firebaseApp from "../lib/firebase";
import firebase from "firebase/compat/app";
import "firebaseui/dist/firebaseui.css";
import { useEffect, useCallback, useContext, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const auth = getAuth(firebaseApp);
  const emailRef = useRef();
  const passwordRef = useRef();
  const ctx = useContext(AuthContext);
  const router = useRouter();

  const handleSignin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        ctx.dispatch({ type: "SETUSER", payload: user });
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const loadFirebaseUI = useCallback(async () => {
    const firebaseui = await import("firebaseui");
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    const uiConfig = {
      signInOptions: [
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          const db = getDatabase();
          const user = authResult.user;
          const userId = user.uid;
          set(ref(db, "users/" + userId), {
            username: user.displayName,
          });
          ctx.dispatch({ type: "SETUSER", payload: user });
          router.push("/dashboard");
        },
      },
    };

    ui.start(".firebase-auth-container", uiConfig);
  }, []);

  useEffect(() => {
    loadFirebaseUI();
  }, []);

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center pb-24 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSignin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    ref={passwordRef}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-sm leading-6">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="flex justify-center my-6">
              <p className="text-sm">
                Don't have an account?{" "}
                <a
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  href="/auth/signup"
                >
                  Sign up here
                </a>
              </p>
            </div>

            <div>
              <div className="relative mt-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="firebase-auth-container pt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
