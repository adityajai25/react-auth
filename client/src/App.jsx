import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from "../src/pages/Home"
import Login from "../src/pages/Login"
import Signup from "../src/pages/Signup"
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import ProtectedRoute from './components/Protected';
import GuestRoute from './components/GuestRoute';

axios.defaults.baseURL = import.meta.env.url;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Toaster position='bottom-left' toastOptions={{duration:8000}}/>
      <Routes>
      <Route
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
      />
        <Route path="/login" element={
          <GuestRoute><Login /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
