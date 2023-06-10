"use client";

import { useState, useContext, useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { AuthContext } from "../auth/AuthContext";
import { useRouter } from "next/navigation";
import Avatar from "../components/UI/Avatar";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState("");
  const ctx = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (ctx.user) {
      setUser(ctx.user);
    }
  }, [ctx.user]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = () => {
    ctx.dispatch({ type: "LOGOUT" });
    router.push("/");
  };

  return (
    <header className="bg-zinc-900">
      <Disclosure as="nav" className="bg-zinc-900">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link className="text-zinc-100 font-semibold" href="/">
                      AetherShuffler
                    </Link>
                  </div>
                </div>

                

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {ctx.user ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm ">
                          <span className="sr-only">Open user menu</span>
                          {user.photoURL ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.photoURL}
                              alt=""
                            />
                          ) : (
                            <Avatar size="small" />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/dashboard"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Favorites
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "cursor-pointer block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link
                      className="flex justify-center rounded-md font-semibold bg-indigo-600 px-2 py-1 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      href="/auth"
                    >
                      Log In<span aria-hidden="true"></span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </header>
  );
}
