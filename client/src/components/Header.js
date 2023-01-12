import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useGetDetailsQuery } from "../app/services/auth/authService";
import { logout, setCredentials } from "../features/auth/authSlice";
import "../styles/header.css";
import { fetcherAccessToken } from "../fetchers/token";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [result, setResult] = useState();
  const dispatch = useDispatch();
  // automatically authenticate user if token is found
  const { data, isFetching } = useGetDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });
  const [token, setToken] = useState("");

  async function getTest() {
    const test = await fetcherAccessToken();
    setResult(test);
    setToken(test.data.metadata.accessToken);
  }
  useEffect(() => {
    getTest();
  }, []);
  useEffect(() => {
    if (result !== undefined) {
      if (result.status === 401) {
        dispatch(logout());
      }
    }
  }, [result]);

  useEffect(() => {
    if (token !== "") localStorage.setItem("userToken", token);
  }, [token]);

  useEffect(() => {
    if (data) dispatch(setCredentials(data.data));
  }, [data, dispatch]);

  return (
    <header>
      <div className="header-status">
        <span>
          {isFetching
            ? `Fetching your profile...`
            : userInfo !== null
            ? `Logged in as ${userInfo.email}`
            : "You're not logged in"}
          {/* {userInfo && `Logged in as ${userInfo.email}`}
          {userInfo === null && "You're not logged in"} */}
        </span>
        <div className="cta">
          {userInfo ? (
            <>
              <Link className="mr-6" to="/changepwd">
                Đổi mật khẩu
              </Link>
              <button
                className="button cursor-pointer"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink className="button" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
