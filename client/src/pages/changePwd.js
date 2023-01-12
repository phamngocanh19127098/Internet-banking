import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetcherchangePwd } from "../fetchers/authen";

const ChangePassword = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm();

  const field1Value = watch("newPassword");
  const field2Value = watch("confirmNewPassword");
  const field3Value = watch("password");
  const fieldsMatch12 = field1Value === field2Value;
  const fieldsMatch13 = field1Value === field3Value;

  const submitForm = async (data) => {
    console.log(userInfo.username, data.password, data.newPassword);

    let response;

    if (!fieldsMatch13) {
      if (fieldsMatch12) {
        response = await fetcherchangePwd(
          userInfo.username,
          data.password,
          data.newPassword
        );
      } else {
        alert("Mật khẩu mới chưa trùng khớp");
      }
    } else {
      alert("Mật khẩu mới không được trùng mật khẩu cũ");
    }

    if (response.data.statusCode === 200) {
      alert(response.data.message);
      navigate("/");
    }
  };

  return (
    <div>
      <div
        className=" bg-cover w-screen flex h-screen justify-center items-center"
        style={{ backgroundImage: `url('../loginbng.png')` }}
      >
        <div className="p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-main-green lg:max-w-xl lg:min-w-[25%] items-center justify-center">
          <h1 className="text-3xl font-semibold text-center text-black uppercase decoration-wavy">
            Đổi mật khẩu
          </h1>
          <form className="mt-6 form" onSubmit={handleSubmit(submitForm)}>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Mật khẩu cũ
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                required
                className="form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>{" "}
            <div className="mb-2">
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold text-gray-800"
              >
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="newPassword"
                {...register("newPassword")}
                required
                className="form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-semibold text-gray-800"
              >
                Xác nhận mật khẩu mới
                {!fieldsMatch12 || !field1Value ? (
                  <span className="ml-2 font-light text-red">
                    Không trùng khớp
                  </span>
                ) : (
                  <span className="ml-2 font-light text-red">Trùng khớp</span>
                )}
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                {...register("confirmNewPassword")}
                required
                className="form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="flex">
              <Link
                to="/"
                className=" w-full text-center px-4 py-2 mr-12 mt-8 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] rounded-lg"
              >
                Trở về
              </Link>
              <button
                type="submit"
                className=" cursor-pointer w-full px-4 py-2 mt-8 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] rounded-lg"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
