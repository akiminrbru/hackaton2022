import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import {
    Routes,
    Route,
} from "react-router-dom";
import Lending from './Components/Lending/Lending';
import CreateEvent from './Components/CreateEvent/CreateEvent';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Lending/>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/createEvent" element={<CreateEvent />}/>
            </Routes>
        </div>
    );
}

export default App;
