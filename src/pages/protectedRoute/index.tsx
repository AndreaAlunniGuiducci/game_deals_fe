import { useSelector } from "react-redux";
import type { StoreType } from "../../store/store";
import { Navigate } from "react-router-dom";
import { getJwt } from "../../utils/getJwt";

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const jwt = useSelector((state: StoreType) => state.myJWT.data.jwt);

  const isAuthenticated = !!getJwt() || !!jwt;
  console.log("AUTHENTICATED", isAuthenticated, "\nGET",getJwt(), "\nSTORE",jwt)
  return isAuthenticated ? children : <Navigate to="/anonymous" replace />;
};

export default ProtectedRoute;
