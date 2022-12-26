import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useGetDetailsQuery } from '../app/services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'
import '../styles/header.css'
import { fetcherAccessToken } from '../fetchers/token'
import useAuth from '../routing/useAuth'
const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { isCustomer, isEmployee, isAdmin } = useAuth()
  // automatically authenticate user if token is found
  const { data, isFetching } = useGetDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  })
  const [token, setToken] = useState("")

  async function getTest() {
    const test = await fetcherAccessToken();
    setToken(test.data.metadata.accessToken)
  }
  useEffect(() => {
    getTest()
  }, [])
  useEffect(() => {
    if (token !== "")
      localStorage.setItem('userToken', token)
  }, [token])

  useEffect(() => {
    if (data) dispatch(setCredentials(data.data))
  }, [data, dispatch])
  if (isCustomer) {
    return (
      <header>
        <div className='header-status'>
          <span>
            {isFetching
              ? `Fetching your profile...`
              : userInfo !== null
                ? `Logged in as ${userInfo.email}`
                : "You're not logged in"}
            {/* {userInfo && `Logged in as ${userInfo.email}`}
            {userInfo === null && "You're not logged in"} */}
          </span>
          <div className='cta'>
            {userInfo ? (
              <button className='button' onClick={() => dispatch(logout())}>
                Logout
              </button>
            ) : (
              <NavLink className='button' to='/login'>
                Login
              </NavLink>
            )}
          </div>
        </div>
        <nav className='container navigation'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/user-profile'>Profile</NavLink>
        </nav>
      </header>
    )
  }


  if (isEmployee) {
    return (
      <header>
        <div className='header-status'>
          <span>
            {isFetching
              ? `Fetching your profile...`
              : userInfo !== null
                ? `Logged in as ${userInfo.email}`
                : "You're not logged in"}
            {/* {userInfo && `Logged in as ${userInfo.email}`}
            {userInfo === null && "You're not logged in"} */}
          </span>
          <div className='cta'>
            {userInfo ? (
              <button className='button' onClick={() => dispatch(logout())}>
                Logout
              </button>
            ) : (
              <NavLink className='button' to='/login'>
                Login
              </NavLink>
            )}
          </div>
        </div>
        <nav className='container navigation'>
          <NavLink to='/'>Work</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/user-profile'>Profile</NavLink>
        </nav>
      </header>
    )
  }


  if (isAdmin) {
    return (
      <header>
        <div className='header-status'>
          <span>
            {isFetching
              ? `Fetching your profile...`
              : userInfo !== null
                ? `Logged in as ${userInfo.email}`
                : "You're not logged in"}
            {/* {userInfo && `Logged in as ${userInfo.email}`}
            {userInfo === null && "You're not logged in"} */}
          </span>
          <div className='cta'>
            {userInfo ? (
              <button className='button' onClick={() => dispatch(logout())}>
                Logout
              </button>
            ) : (
              <NavLink className='button' to='/login'>
                Login
              </NavLink>
            )}
          </div>
        </div>
        <nav className='container navigation'>
          <NavLink to='/'>Admin</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/user-profile'>Profile</NavLink>
        </nav>
      </header>
    )
  }
}

export default Header
