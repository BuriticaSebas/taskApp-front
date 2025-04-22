import React from "react";
import { useNavigate } from "react-router-dom";

const ModalConfig = ({ ModalConfigUser }) => {
  if (!ModalConfigUser) return null;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="absolute right-0 flex flex-col gap-3 p-4 bg-white rounded-xl shadow-lg border border-gray-200 w-64">
  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
    Generate Backup
  </button>

  <button
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
    onClick={handleLogout}
  >
    Cerrar Sesión
  </button>
</div>

  );
};

export default ModalConfig;
