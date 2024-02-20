import { Fragment } from "react";
import React, { useState, useRef } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Link from "next/link";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);

  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const oldpass = oldPasswordInputRef.current.value;
    const newpass = newPasswordInputRef.current.value;

    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: oldpass,
        newPassword: newpass,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (data.message == "Password updated!") {
      event.target.reset();
    }
    setLoading(false);
  };
  return (
    <Fragment>
      <Head>
        <title>Lost Nest</title>
        <meta
          name="description"
          content="Lost and Found Hub for University Students"
        />
        <link rel="icon" href="/images/LostNestLogo.svg" />
      </Head>
      <ToastContainer autoClose={1500} draggable closeOnClick />
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[450px] h-[350px] border-2 border-solid mx-2  p-5 rounded-2xl shadow-2xl border-white hover:border-double">
          <h1 className="text-2xl font-bold text-white flex items-center justify-center">
            Reset Password?
          </h1>

          <form onSubmit={submit}>
            <div className="mt-5 ">
              <label className="block text-gray-300">Enter Old Password</label>
              <input
                type="password"
                placeholder="Enter your old password"
                className="w-full h-10 p-2 border rounded-md outline-red-400 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ref={oldPasswordInputRef}
                required
              ></input>
            </div>
            <div className="mt-5">
              <label className="block text-gray-300">Enter New Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="w-full h-10 p-2 border rounded-md outline-red-400 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ref={newPasswordInputRef}
                required
              />
            </div>
            <div className="mt-5">
              <button
                className="w-full bg-indigo-600 p-2 rounded-lg text-white hover:bg-indigo-500"
                disabled={loading}
              >
                {loading ? "Processing.." : "Submit"}
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/signin"
                className="text-white text-sm hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}




