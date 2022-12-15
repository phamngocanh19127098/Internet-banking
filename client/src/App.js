import React from "react";
import 'tailwindcss/tailwind.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/home";
import Login from "./pages/login";
import Accounts from "./pages/accounts";
import Other from "./pages/other";
import Contact from "./pages/contact";
import Payment from "./pages/payment";
import Loan from "./pages/loan";
import Recipents from "./pages/recipients";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/accounts' element={<Accounts />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/other' element={<Other />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/loan' element={<Loan />} />
        <Route path='/recipents' element={<Recipents />} />
      </Routes>
    </Router>
  );
}
export default App;
