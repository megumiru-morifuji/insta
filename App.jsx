import TopPages from "./pages/TopPages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './App.css'
import { BrowserRouter,Router, Routes, Route } from 'react-router-dom';
import {useState,useEffect} from "react";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        {/* 他のルートを追加予定 */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
