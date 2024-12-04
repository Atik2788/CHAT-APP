import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import { axiosInstance } from "./lib/asiox";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

const App = () => {
  // axiosInstance.get()
  const {authUser, checkAuth} = useAuthStore()

  useEffect(() =>{
    checkAuth()
  }, [checkAuth])

  console.log({authUser});
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup  " element={<SignUpPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/settings" element={<SettingsPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
      </Routes>

    </div>
  );
};

export default App;
