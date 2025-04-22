import { Navigate, Outlet } from "react-router-dom"

const RutaPrivada = () => {

  const rutaPrivada = localStorage.getItem("token");

  return rutaPrivada ? <Outlet/> : <Navigate to="/login"/>
}

export default RutaPrivada