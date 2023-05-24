"use client";
import { useContext, useState, componentDidMount, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import Avatar from "../components/UI/Avatar";

const stats = [{ label: "Favorite Cards", value: 0 }];

export default function Dashboard() {
  const [user, setUser] = useState("");

  const ctx = useContext(AuthContext);
  const router = useRouter();


  useEffect(() => {
    if (ctx.user) {
      setUser(ctx.user);
    }
  }, [ctx.user]);

  return (
    <div className="overflow-hidden rounded-lg">
      <h2 className="sr-only" id="profile-overview-title">
        Profile Overview
      </h2>
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
      <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="px-6 py-5 text-center text-sm font-medium"
          >
            <span className="text-gray-900">{stat.value}</span>{" "}
            <span className="text-gray-600">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="text-center py-10 my-12">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No Cards</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by searching new cards with the shuffler.
        </p>
        <div className="mt-6">
          <button
            onClick={() => {
              router.push("/");
            }}
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Find Cards
          </button>
        </div>
      </div>
    </div>
  );
}
