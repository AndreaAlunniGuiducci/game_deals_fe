import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/molecules/header";
import Button from "./components/atoms/button";
import Test from "./pages/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header title="Game Deals" />
        <Outlet />
      </>
    ),
    children: [{ path: "test", element: <Test /> }],
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
