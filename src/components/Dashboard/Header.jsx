import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import ModalConfig from "./User/ModalConfig";

const Header = () => {
  const [openModalConfigUser, setOpenModalConfigUser] = useState(false);

  const toggleModalConfigUser = () => {
    setOpenModalConfigUser((prev) => !prev);
  };

  const nameUser = localStorage.getItem("nameUser")?.toUpperCase() || "USER";

  return (
    <header>
      <nav className="bg-white p-4 shadow-md w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">TaskApp</h1>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleModalConfigUser}
              className="text-gray-800 hover:text-gray-500 text-2xl"
              aria-label="User Settings"
            >
              <FaUserAlt />
            </button>
          </div>
        </div>
      </nav>

      <ModalConfig ModalConfigUser={openModalConfigUser} />

      <div className="text-center p-4 mt-5 px-2">
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-gray-900 drop-shadow-lg">
          Welcome back, {nameUser}!
        </h1>
        <p className="mt-2 text-base sm:text-lg text-gray-700">
          Ready to crush the day. Let’s do this!
        </p>
      </div>
    </header>
  );
};

export default Header;
