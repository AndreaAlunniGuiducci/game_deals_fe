import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Header from "./components/molecules/header";
import AnonymousPage from "./pages/anonymousPage";
import Home from "./pages/home";
import { getJwt } from "./utils/getJwt";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header title="Game Deals" />
        {getJwt() ? <Outlet /> : <AnonymousPage />}
      </>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "register", element: <Home /> },
      { path: "login", element: <Home /> },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
