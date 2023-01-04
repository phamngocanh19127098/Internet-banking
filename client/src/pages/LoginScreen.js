import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Reaptcha from "reaptcha";
import Loader from "../components/loading";

const LoginScreen = () => {
  const data = JSON.parse(localStorage.getItem("userInfomation"));
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const [disableSubmit, setDisableSubmit] = useState(true);

  // redirect authenticated user to profile screen
  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      if (userInfo.role === "customer") {
        navigate("/customer");
      }
      if (userInfo.role === "employee") {
        navigate("/employee");
      }
      if (userInfo.role === "admin") {
        navigate("/admin");
      }
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  const verify = () => {
    console.log("ABC");
    captchaRef.current.getResponse().then((res) => {
      setCaptchaToken(res);
      setDisableSubmit(false);
    });
  };
  if (data) {
    return <Loader />;
  }

  return (
    <div>
      <div
        className=" bg-cover w-screen flex h-screen justify-center items-center"
        style={{ backgroundImage: `url('../loginbng.png')` }}
      >
        <div className="p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-main-green lg:max-w-xl lg:min-w-[25%] items-center justify-center">
          <h1 className="text-3xl font-semibold text-center text-black uppercase decoration-wavy">
            Đăng nhập
          </h1>
          <form className="mt-6 form" onSubmit={handleSubmit(submitForm)}>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-800"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                {...register("username")}
                required
                className=" form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                required
                className="form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <Reaptcha
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // client key testing
              ref={captchaRef}
              onVerify={verify}
            />
            <Link
              to="/forgotpassword"
              className="text-xs text-black hover:underline"
            >
              Quên mật khẩu?
            </Link>
            <div className="mt-6">
              <button
                type="submit"
                disabled={disableSubmit}
                className=" button w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] hover:from-[#076F32] hover:to-[#076F32] cursor-pointer rounded-lg"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
