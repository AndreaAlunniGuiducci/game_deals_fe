import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.scss";
import Header from "./components/molecules/header";
import AnonymousPage from "./pages/anonymousPage";
import Home from "./pages/home";
import { getJwt } from "./utils/getJwt";
import "react";
import type React from "react";
import { routePath } from "./utils/routePath";
import Register from "./pages/register";
import Login from "./pages/login/inde";

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
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
