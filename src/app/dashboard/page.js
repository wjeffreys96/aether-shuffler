"use client";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import Avatar from "../components/UI/Avatar";
import CardLayout from "../components/CardLayout";
import EmptyState from "../components/EmptyState";
import Spinner from "../components/UI/Spinner";

export default function Dashboard() {
  const [user, setUser] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const ctx = useContext(AuthContext);
  const router = useRouter();
  const stats = [{ label: "Favorite Cards", value: favorites.length }];
  const db = getDatabase();

  const handleDelete = (id) => {
    const deleteRef = ref(db, "users/" + ctx.user.uid + "/favorites/" + id);
    remove(deleteRef);
  };

  const getFavorites = () => {
    const faveRef = ref(db, "users/" + ctx.user.uid + "/favorites");
    onValue(faveRef, (snapshot) => {
      const dataArray = [];
      const data = snapshot.val();
      for (let key in data) {
        dataArray.push(data[key]);
      }
      setFavorites(dataArray);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (ctx.user) {
      setUser(ctx.user);
      getFavorites();
    } else {
      setLoading(false);
    }
  }, [ctx.user]);

  return (
    <main className="min-h-custom flex flex-col">
      <div className="bg-white p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              {user.photoURL ? (
                <img
                  className="mx-auto h-20 w-20 rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              ) : (
                <Avatar size="large" />
              )}
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600">Welcome,</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                {user.displayName ? user.displayName : user.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center border-b mx-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="px-6 md:py-3 text-center text-sm font-medium"
          >
            <span className="text-gray-900">{stat.value}</span>{" "}
            <span className="text-gray-600">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="text-center grow flex flex-col">
        {favorites.length === 0 && (
          <div>
            <p className="my-4 text-sm text-gray-500">
              Get started by searching new cards with the shuffler.
            </p>
          </div>
        )}

        <div className="flex justify-center flex-wrap p-3 grow">
          {loading ? (
            <Spinner />
          ) : favorites.length > 0 ? (
            favorites.map((card) => {
              return (
                <div key={card.id} className="flex flex-col">
                  <CardLayout
                    key={card.name}
                    name={card.name}
                    id={card.id}
                    imageUri={card.imageUri}
                  />
                  <div className="flex justify-center">
                    <button
                      // key={card.name}
                      className="bg-red-500 hover:bg-red-700 text-white text-sm rounded py-2 px-6"
                      onClick={() => {
                        handleDelete(card.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState />
          )}
        </div>

        {favorites.length === 0 && (
          <>
            <hr className="m-4" />
            <div className="mb-6">
              <button
                onClick={() => {
                  router.push("/");
                }}
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
                Find Cards
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
