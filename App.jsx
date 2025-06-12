import TopPages from "./pages/TopPages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './App.css'
import { BrowserRouter,Router, Routes, Route } from 'react-router-dom';
import {useState,useEffect} from "react";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPages />} />
        <Route path="/login" element={<Login email={email} password={password} setEmail={setEmail} setPassword={setPassword} />} />
        <Route path="/Signup" element={<Signup />} />
        {/* 他のルートを追加予定 */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
