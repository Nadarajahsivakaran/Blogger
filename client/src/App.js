import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Header from "./Component/Header";
import Home from "./Pages/Home";
import { ToastContainer } from 'react-toastify';


function App() {
  
  return (
    <BrowserRouter>
   <ToastContainer/>
    <Header/>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
