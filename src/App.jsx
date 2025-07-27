import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/Register";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  },[])
  return (
    <>
      <Router>
        <div className="flex items-center justify-center h-screen ">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={user ? <Navigate to="/Profile" /> :<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/Profile" element={<Profile />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App
