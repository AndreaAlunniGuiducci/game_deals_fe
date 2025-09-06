import "react";
import { useSelector } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Header from "./components/molecules/header";
import Loader from "./components/organisms/loader";
import AnonymousPage from "./pages/anonymousPage";
import Home from "./pages/home";
import Login from "./pages/login/inde";
import Register from "./pages/register";
import type { StoreType } from "./store/store";
import { routePath } from "./utils/routePath";
import ProtectedRoute from "./pages/protectedRoute";
import { getJwt } from "./utils/getJwt";

function App() {
  const isLoading = useSelector(
    (state: StoreType) => state?.isLoading?.data.isLoading
  );
  const userStore = useSelector((state: StoreType) => state.myJWT.data);

  const useIsLogged = (!!userStore.jwt && !!userStore.username) || !!getJwt();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header title="Game Deals" isLoggedIn={useIsLogged} />
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
          path: routePath.deal_detail,
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
        {
          path: routePath.anonymous,
          element: <AnonymousPage />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      {isLoading && <Loader />} <RouterProvider router={router} />
    </div>
  );
}

export default App;
