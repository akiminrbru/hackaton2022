import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Lending from './Components/Lending/Lending';
import Profile from './Components/Profile/Profile';
import {
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Lending />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/profile" element={<Profile />}/>
            </Routes>
        </div>
    );
}

export default App;
