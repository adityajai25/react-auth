import './App.css'
import {Routes, Route } from 'react-router-dom'
import Home from "../src/pages/Home"
import Login from "../src/pages/Login"
import Signup from "../src/pages/Signup"
import axios from 'axios';
import {Toaster} from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.url;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Toaster position='bottom-left' toastOptions={{duration:8000}}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
