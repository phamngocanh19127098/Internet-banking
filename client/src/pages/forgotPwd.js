import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetcherForgetPwd } from "../fetchers/authen";
// import ConfirmForgotPasswordOTP from "../components/confirmForgotPasswordOTP";

const ForgotPassword = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  // redirect authenticated user to profile screen
  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      navigate("/user-profile");
    }
  }, [navigate, userInfo]);

  const submitForm = async (data) => {
    const response = await fetcherForgetPwd(data);
    if (!!response) {
      setShowOTPModal(true);
    }
  };

  return (
    <div>
      <div
        className=" bg-cover w-full flex h-screen justify-center items-center"
        style={{ backgroundImage: `url('../loginbng.png')` }}
      >
        <div className="p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-main-green lg:max-w-xl lg:min-w-[25%] items-center justify-center">
          <h1 className="text-3xl font-semibold text-center text-black uppercase decoration-wavy">
            Quên mật khẩu
          </h1>
          <form className="mt-6 form" onSubmit={handleSubmit(submitForm)}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-800"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                {...register("username")}
                required
                onChange={handleChange}
                value={username}
                className=" form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <div className="flex">
                <Link
                  to="/"
                  className=" w-full text-center px-4 py-2 mr-12 mt-8 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] rounded-lg"
                >
                  Trở về
                </Link>
                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-8 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] rounded-lg"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </form>
          {/*{showOTPModal && (*/}
          {/*  <ConfirmForgotPasswordOTP*/}
          {/*    onClose={() => {*/}
          {/*      setShowOTPModal(false);*/}
          {/*    }}*/}
          {/*    visible={showOTPModal}*/}
          {/*    username={username}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
