import "react";
import type React from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.scss";
import Header from "./components/molecules/header";
import Loader from "./components/organisms/loader";
import AnonymousPage from "./pages/anonymousPage";
import Home from "./pages/home";
import Login from "./pages/login/inde";
import Register from "./pages/register";
import { getJwt } from "./utils/getJwt";
import { routePath } from "./utils/routePath";
import type { StoreType } from "./store/store";

function ProtectedRoute({ children }: { children: React.JSX.Element }) {
  const isAuthenticated = !!getJwt();
  return isAuthenticated ? children : <Navigate to="/anonymous" replace />;
}

const router = createBrowserRouter([
  {
    path: "/anonymous",
    element: (
      <>
        <Header title="Game Deals" />
        <AnonymousPage />
      </>
    ),
  },
  {
    path: "/",
    element: (
      <>
        <Header title="Game Deals" />
        <Outlet />
      </>
    ),
    children: [
      {
        path: routePath.home,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: routePath.register,
        element: <Register />,
      },
      {
        path: routePath.login,
        element: <Login />,
      },
    ],
  },
]);

function App() {
  const isLoading = useSelector(
    (state: StoreType) => state?.isLoading?.data.isLoading
  );
  return (
    <div className="App">
      {isLoading ? <Loader /> : <RouterProvider router={router} />}
    </div>
  );
}

export default App;
