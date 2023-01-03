import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ProfileScreen from "./pages/ProfileScreen";
import HomeScreen from "./pages/home";
import ProtectedRoute from "./routing/ProtectedRoute";
import HomeCustomer from "./pages/homeCustomer";
import Loan from "./pages/loan";
import Recipents from "./pages/recipients";
import Contact from "./pages/contact";
import Other from "./pages/other";
import Accounts from "./pages/accounts";
import Payment from "./pages/payment";
import ChangePassword from "./pages/changePwd";
import Transaction from "./pages/transactions";
import Employee from "./pages/employee";
import { ROLES } from "./routing/roles";
import RequireAuth from "./routing/RequireAuth";
import ForgotPassword from "./pages/forgotPwd";
import UnpaidLoan from "./pages/unpaidLoan";
import RoleError from "./pages/error/roleError";
function App() {
  return (
    <Router>
      <Header />
      <main className="container content">
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route path="/user-profile" element={<ProfileScreen />} />
              <Route path="/changepwd" element={<ChangePassword />} />
              <Route path="/roleError" element={<RoleError />} />
              <Route element={<RequireAuth allowedRoles={ROLES.Customer} />}>

                <Route path="/" element={<HomeCustomer />} />
                <Route path="/customer" element={<HomeCustomer />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/loan" element={<Loan />} />
                <Route path="unpaid-loan" element={<UnpaidLoan />} />
                <Route path="/recipents" element={<Recipents />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/other" element={<Other />} />
                <Route path="/transactions" element={<Transaction />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={ROLES.Employee} />}>
                <Route path="/" element={<Employee />} />
                <Route path="/employee" element={<Employee />} />
                {/* <Route path='/employee' element={<Employee />} /> */}
              </Route>
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
