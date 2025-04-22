import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import ModalConfig from "./User/ModalConfig";

const Header = () => {


  const [openModalConfigUser,setOpenModalConfigUser] = useState(false)

  const toggleModalConfigUser = () => {
    setOpenModalConfigUser(prev => !prev);
  };

  const nameUser = localStorage.getItem("nameUser").toUpperCase()
  return (
    <header>
      <nav className="bg-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">TaskApp</h1>

          <div className="hidden sm:flex gap-4 items-center">
            <button onClick={toggleModalConfigUser}>
            <FaUserAlt className="text-2xl hover:text-gray-500" />
            </button>
            
          </div>
        </div>
      </nav>
      <ModalConfig ModalConfigUser = {openModalConfigUser}></ModalConfig>

      <div className="text-center p-4 mt-5">
        <h1 className="font-extrabold text-5xl md:text-6xl text-gray-900 drop-shadow-lg">
          Welcome back, {nameUser}!
        </h1>
        <p className="mt-2 text-lg text-gray-700">
          Ready to crush the day. Let’s do this!
        </p>
      </div>
    </header>
  );
};

export default Header;
