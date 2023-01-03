import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const data = JSON.parse(localStorage.getItem("userInfomation"));
  // show unauthorized screen if no user is found in redux store
  if (!userInfo && !data) {
    return <Navigate to="/login" />;
  }
  const role = data.role;
  if (!userInfo && data) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
