import React, { Component } from 'react';
class Login extends Component {
    render() {
        return (
            <div>
                <div className=' bg-cover w-full flex h-screen justify-center items-center' style={{ backgroundImage: `url('../loginbng.png')` }}>
                    <div className="p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-main-green lg:max-w-xl lg:min-w-[25%] items-center justify-center">
                        <h1 className="text-3xl font-semibold text-center text-black uppercase decoration-wavy">
                            Đăng nhập
                        </h1>
                        <form className="mt-6">
                            <div className="mb-2">
                                <label
                                    for="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Tên đăng nhập
                                </label>
                                <input
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
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
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <a
                                href="#"
                                className="text-xs text-black hover:underline"
                            >
                                Quên mật khẩu?
                            </a>
                            <div className="mt-6">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] hover:from-[#025223] hover:to-[#076F32] rounded-lg">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;