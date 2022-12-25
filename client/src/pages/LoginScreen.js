import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import { useEffect } from 'react'
import Error from '../components/Error'
import Spinner from '../components/Spinner'

const LoginScreen = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  // redirect authenticated user to profile screen
  useEffect(() => {
    console.log(userInfo)
    if (userInfo) {
      navigate('/user-profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
    <div>
      <div className=' bg-cover w-full flex h-screen justify-center items-center' style={{ backgroundImage: `url('../loginbng.png')` }}>
        <div className="p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-main-green lg:max-w-xl lg:min-w-[25%] items-center justify-center">
          <h1 className="text-3xl font-semibold text-center text-black uppercase decoration-wavy">
            Đăng nhập
          </h1>
          <form className="mt-6 form" onSubmit={handleSubmit(submitForm)}>
            <div className="mb-2">
              <label
                for="username"
                className="block text-sm font-semibold text-gray-800"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                {...register('username')}
                required
                className=" form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                {...register('password')}
                required
                className="form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <a
              href="#"
              className="text-xs text-black hover:underline"
            >
              Quên mật khẩu?
            </a>
            <div className="mt-6">
              <button className="form__submit button w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] rounded-lg">
                Đăng nhập
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Bạn chưa có tài khoản?{" "}
            <a
              href="#"
              className="font-medium text-main-green hover:underline"
            >
              Đăng ký
            </a>
          </p>
        </div>
      </div>

    </div>
  )
}

export default LoginScreen
