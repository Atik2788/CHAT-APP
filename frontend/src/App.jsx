import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import { axiosInstance } from "./lib/asiox";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react"

const App = () => {
  // axiosInstance.get()
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() =>{
    checkAuth()
  }, [checkAuth])

  console.log({authUser});

  if(isCheckingAuth && !authUser) 
    return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )

  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={ authUser ? <HomePage/> : <Navigate to='/login'/>}/>
        <Route path="/signup  " element={<SignUpPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/settings" element={ authUser ?  <SettingsPage /> : <Navigate to='/login'/>}/>
        <Route path="/profile" element={<ProfilePage />}/>
      </Routes>

    </div>
  );
};

export default App;
