"use client";
import { useEffect } from "react";
import { login } from "../lib/action";
import { useFormState } from "react-dom";
import { Login } from "../lib/interface";
const initialState = {
  errors: {
    username: "",
    password: "",
  },
};

export default function Page() {
  const [state, action] = useFormState<Login, FormData>(login, initialState);
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <section className="fixed w-screen h-screen bg-cuslor-1 overflow-y-scroll">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Lestari Belajar
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Admin Login
            </h1>
            {state?.success === false && (
              <div className="text-black px-4 py-2.5 bg-red-200 rounded-lg">
                {state.error}
              </div>
            )}

            {state?.success &&(
              <div className="text-black px-4 py-2.5 bg-green-200 rounded-lg">
                Login Berhasil
              </div>
            )}
            <form className="space-y-4 md:space-y-6" action={action}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your username"
                />
                {state?.errors?.username && (
                  <div className="text-red-500 py-4">
                    {state.errors.username}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {state?.errors?.password && (
                  <div className="text-red-500 py-4">
                    {state.errors.password}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-black bg-cuslor-4 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
