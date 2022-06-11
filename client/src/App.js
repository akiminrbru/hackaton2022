import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import {
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import Lending from './Components/Lending/Lending';
import CreateEvent from './Components/CreateEvent/CreateEvent'; 
import News from './Components/News/News';
import {Context} from './context';
import axios from 'axios';


function App() {
    const [loginStatus, setLoginStatus] = useState(false);

    //const navigate = useNavigate();

    // useEffect(() => {
    //     if (localStorage.getItem("token")){
    //        return navigate("/profile");
    //     }
    // }, [localStorage.getItem("token")]);

    useEffect(() => {
        axios.get("http://hack.mysecrets.site/api/user/check", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json;charset=utf-8",
            }
        }).then(res => {
            setLoginStatus(true);
            console.log(loginStatus)
            console.log(res)
        }).catch(res => console.log(res));
    });

    return (
        <Context.Provider value={{loginStatus, setLoginStatus}}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Lending/>}/>
                    <Route path="/events" element={<News/>}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/createEvent" element={<CreateEvent />}/>
                </Routes>
            </div>
        </Context.Provider>
    );
}

export default App;
