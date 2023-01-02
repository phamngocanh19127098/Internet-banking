import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const check = localStorage.getItem('userToken')

  // show unauthorized screen if no user is found in redux store
  if (check === null) {
    console.log(1)
    return (
      <Navigate to='/login' />
    )
  }
  if (check !== null) {
    console.log(2)
    return <Outlet />
  }

}

export default ProtectedRoute
