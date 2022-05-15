import { Avatar } from "antd";
import React from "react";
import icon from "../../images/cryptocurrency.png";
import "./index.css";

const Signup = () => {
  return (
    <div
      className="relative
          before:absolute before:inset-0 before:w-full flex items-center bg-[#001529] !h-full"
    >
      <div className="relative container mx-auto px-6 text-white md:px-12 xl:px-40 h-min md:w-8/12">
        <div className="rounded-xl py-6 md:py-0 border bg-opacity-10 shadow-white/30 backdrop-blur-2xl bg-black/10 ">
          <div className="px-6 sm:p-16">
            <h2 className="mb-8 flex flex-col items-center text-center text-2xl text-cyan-400 font-bold">
              <div className="">
                <Avatar src={icon} className="px-6" size="large" />
                <span className="ml-2 text-[#1686F0]">Cryptoverse</span>
              </div>
              <span className="text-xs">Let's get Signed Up!</span>
            </h2>
            <form action className="space-y-8">
              <div className="space-y-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-gray-100 text-xs font-bold"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
    focus:ring-2 focus:ring-sky-300 focus:outline-none
    invalid:ring-2 invalid:ring-red-400"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-gray-100 text-xs font-bold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
    focus:ring-2 focus:ring-sky-300 focus:outline-none
    invalid:ring-2 invalid:ring-red-400"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-gray-100 text-xs font-bold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
    focus:ring-2 focus:ring-sky-300 focus:outline-none
    invalid:ring-2 invalid:ring-red-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-md bg-sky-600
                              focus:bg-sky-700 active:bg-sky-500 shadow shadow-blue-500/50"
              >
                <span className="text-white font-black italic font-[sans_serif]">
                  Register
                </span>
              </button>
              <p className="border-t pt-6 text-sm">
                Do have an account ?
                <a href="/signup" className="ml-2 text-sky-500">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
