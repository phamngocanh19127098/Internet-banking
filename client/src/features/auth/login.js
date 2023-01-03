import React, { Component } from 'react';
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = (await login({ username, password }).unwrap()).metadata
            console.log(accessToken)
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>


    return (
        <div>
            <div className=' bg-cover w-full flex h-screen justify-center items-center' style={{ backgroundImage: `url('../loginbng.png')` }}>
                <div className="p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-main-green lg:max-w-xl lg:min-w-[25%] items-center justify-center">
                    <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                    <h1 className="text-3xl font-semibold text-center text-black uppercase decoration-wavy">
                        Đăng nhập
                    </h1>
                    <form className="mt-6 form" onSubmit={handleSubmit}>
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
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                autoComplete="off"
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
                                onChange={handlePwdInput}
                                value={password}
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
                            <button className="form__submit-button w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] rounded-lg">
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
    );
}


export default Login; 
