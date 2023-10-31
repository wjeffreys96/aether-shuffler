"use client";
import { useReducer, useRef, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { getAuth } from "firebase/auth";
import Input from "@/app/components/UI/Inputs/Input";
import { useRouter } from "next/navigation";
import RegisterNewUser from "@/app/utils/RegisterNewUser";
import YupValidator from "@/app/utils/YupValidator";

const initialState = {
  email: "",
  password: "",
  passwordAgain: "",
  username: "",
  emailValid: false,
  passwordValid: false,
  passwordAgainValid: false,
  usernameValid: false,
  emailTouched: false,
  passwordTouched: false,
  passwordAgainTouched: false,
  usernameTouched: false,
  formValid: false,
  error_general: "",
  error_email: "",
  error_password: "",
  error_passwordAgain: "",
  error_username: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "EMAIL_VALID":
      const emailIsValid = YupValidator(action.value, "EMAIL");
      if (emailIsValid.error) {
        return {
          ...state,
          emailValid: false,
          error_email: emailIsValid.error,
          email: action.value,
        };
      } else {
        return { ...state, emailValid: true, error_email: "" };
      }

    case "PASSWORD_VALID":
      const passwordIsValid = YupValidator(action.value, "PASSWORD");
      if (passwordIsValid.error) {
        return {
          ...state,
          passwordValid: false,
          error_password: passwordIsValid.error,
        };
      } else {
        return {
          ...state,
          passwordValid: true,
          error_password: "",
          password: action.value,
        };
      }

    case "PASSWORDAGAIN_VALID":
      // checks if password matches password again then returns the state accordingly
      if (action.value === state.password) {
        return {
          ...state,
          passwordAgainValid: true,
          error_passwordAgain: "",
          passwordAgain: action.value,
        };
      } else {
        return {
          ...state,
          passwordAgainValid: false,
          error_passwordAgain: "Passwords do not match",
        };
      }

    case "USERNAME_VALID":
      const usernameIsValid = YupValidator(action.value, "USERNAME");
      if (usernameIsValid.error) {
        return {
          ...state,
          usernameValid: false,
          error_username: usernameIsValid.error,
          username: action.value,
        };
      } else {
        return {
          ...state,
          usernameValid: true,
          error_username: "",
          username: action.value,
        };
      }

    case "SET_FIELD_TOUCHED_TRUE":
      return { ...state, [action.field]: true };
    
    case "SET_ERROR_GENERAL":
      return { ...state, error_general: action.value };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function RegisterForm() {
  const ctx = useContext(AuthContext);
  const auth = getAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const passwordRef = useRef(null);
  const passwordAgainRef = useRef(null);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const router = useRouter();

  const handleEmailBlur = () => {
    const email = emailRef.current.value;
    dispatch({ type: "SET_FIELD_TOUCHED_TRUE", field: "emailTouched" });
    dispatch({ type: "EMAIL_VALID", value: email });
  };

  const handlePasswordBlur = () => {
    const password = passwordRef.current.value;
    dispatch({ type: "SET_FIELD_TOUCHED_TRUE", field: "passwordTouched" });
    dispatch({ type: "PASSWORD_VALID", value: password });
  };

  const handlePasswordAgainBlur = () => {
    const passwordAgain = passwordAgainRef.current.value;
    dispatch({ type: "SET_FIELD_TOUCHED_TRUE", field: "passwordAgainTouched" });
    dispatch({ type: "PASSWORDAGAIN_VALID", value: passwordAgain });
  };

  const handleUsernameBlur = () => {
    const username = usernameRef.current.value;
    dispatch({ type: "SET_FIELD_TOUCHED_TRUE", field: "usernameTouched" });
    dispatch({ type: "USERNAME_VALID", value: username });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;

    const formIsValid =
      state.emailValid &&
      state.passwordValid &&
      state.passwordAgainValid &&
      state.usernameValid;

    if (formIsValid) {
        RegisterNewUser(auth, email, password, username, ctx, router, dispatch);
  }
  };

  return (
    <div className="mb-12 lg:mx-24 md:mx-10">
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-2 gap-y-2 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll never sell or give out your data.
            </p>
          <div>
          </div>
            <br />
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address:
                  </label>
                  <div className="mt-2">
                    <Input
                      onBlur={handleEmailBlur}
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      placeholder="your@email.com"
                      className={`${
                        !state.emailValid && state.emailTouched
                          ? "bg-red-100"
                          : ""
                      }`}
                    />
                    <p className="text-sm text-red-500">{state.error_email}</p>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username:
                  </label>
                  <div className="mt-2">
                    <Input
                      onBlur={handleUsernameBlur}
                      ref={usernameRef}
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder="Your Username"
                      className={`${
                        !state.usernameValid && state.usernameTouched
                          ? "bg-red-100"
                          : ""
                      }`}
                    />
                    <p className="text-sm text-red-500">
                      {state.error_username}
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password:
                  </label>
                  <div className="mt-2">
                    <Input
                      onBlur={handlePasswordBlur}
                      ref={passwordRef}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      placeholder="********"
                      className={`${
                        !state.passwordValid && state.passwordTouched
                          ? "bg-red-100"
                          : ""
                      } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                    <p className="text-sm text-red-500">
                      {state.error_password}
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="password-again"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password Again:
                  </label>
                  <div className="mt-2">
                    <Input
                      onBlur={handlePasswordAgainBlur}
                      ref={passwordAgainRef}
                      id="password-again"
                      name="password-again"
                      type="password"
                      autoComplete="password"
                      placeholder="********"
                      className={`${
                        !state.passwordAgainValid && state.passwordAgainTouched
                          ? "bg-red-100"
                          : ""
                      } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                    <p className="text-sm text-red-500">
                      {state.error_passwordAgain}
                      {state.error_general}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
