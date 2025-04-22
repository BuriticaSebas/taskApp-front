import { createBrowserRouter, RouterProvider, Navigate} from "react-router-dom"
import Login from "./components/Dashboard/User/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import RutaPrivada from "./components/RutaPrivada.jsx"
import RegisterUser from "./components/Dashboard/User/RegisterUser.jsx"



function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />
    }
    ,
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <RegisterUser/>
    },
    {
      path: "/dashboard",
      element: <RutaPrivada></RutaPrivada>,
      children: [
        {
          path: "",
          element: <Dashboard></Dashboard>
        }
      ]
    }
  ])

  
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
