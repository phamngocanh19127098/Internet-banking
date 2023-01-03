import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <Navigate to='/login' />
    )
  }

  return <Outlet />
}
export default ProtectedRoute;
