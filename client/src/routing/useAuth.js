import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const { userInfo } = useSelector((state) => state.auth)
    let isEmployee = false
    let isAdmin = false
    let isCustomer = false
    let status = "Customer"

    if (userInfo) {
        const { username, role } = userInfo
        isCustomer = role.includes('customer')
        isEmployee = role.includes('employee')
        isAdmin = role.includes('admin')
        if (isCustomer) status = "customer"
        if (isEmployee) status = "eployee"
        if (isAdmin) status = "admin"

        return { username, role, status, isCustomer, isEmployee, isAdmin }
    }

    return { username: '', roles: [], isCustomer, isEmployee, isAdmin, status }
}
export default useAuth