import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import { useEffect, useState, useCallback } from 'react'
import { fetcherForgetPwd, fetcherVerifyOTP } from '../fetchers/authen'

const ForgotPassword = () => {
    const { loading, userInfo, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()
    const [username, setUsername] = useState('');

    const handleChange = event => {
        setUsername(event.target.value);
    };

    // redirect authenticated user to profile screen
    useEffect(() => {
        console.log(userInfo)
        if (userInfo) {
            navigate('/user-profile')
        }
    }, [navigate, userInfo])


    async function handleChange() {
        const res = await fetcherForgetPwd(username);
        console.log(res)
    }


    const submitForm = async (data) => {
        const res = await fetcherVerifyOTP(data);
        console.log(res)
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
                                onChange={handleChange}
                                value={username}
                                className=" form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            <button onClick={sendOTP()} className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] rounded-lg">
                                Gửi OTP
                            </button>
                        </div>
                        <div className="mb-2">
                            <label
                                for="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                OTP
                            </label>
                            <input
                                type="tel"
                                id="OTP"
                                {...register('OTP')}
                                required
                                className="form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mt-6">
                            <button type="submit" className=" button w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] rounded-lg">
                                Cấp lại mật khẩu
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword
