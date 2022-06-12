import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import logo from './../../img/logo.svg';
import logowhite from './../../img/logo2.svg';
import axios from "axios";
import {Context} from './../../context';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState('');
    const [emailErorr, setEmailError] = useState("Email не может быть пустым");

    const [password, setPassword] = useState('');
    const [passwordDirty, setPasswordDirty] = useState('');
    const [passwordErorr, setPasswordError] = useState("Пароль не может быть пустым");

    const [formValid, setFormValid] = useState(false);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    }

    function emailChange(event) {
        setEmail(event.target.value);

        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(event.target.value).toLowerCase())) {
            setEmailError("Неккоректный email")
        } else {
            setEmailError("");
        }
    }

    function passwordChange(event) {
        setPassword(event.target.value);

        if(!event.target.value) {
                setPasswordError("Пароль не может быть пустым");
        }
        else {
            setPasswordError("");
        }
    }

    useEffect(() => {
        if (emailErorr || passwordErorr) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailErorr, passwordErorr])

    const {loginStatus, setLoginStatus} = useContext(Context);

    const [response, setResponse] = useState();

    function authUser() {
        const user = {
            email,
            password
        }

        axios.post("http://hack.mysecrets.site/api/auth/login", user).then(res => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            setLoginStatus(true);
            navigate('/profile');
        }).catch(res => {
            console.log(res);
            setResponse(res.response.data.message);
        });

        setEmail("");
        setPassword("");
    }

    return (
        <div>
            {loginStatus ?
                <div>
                    {navigate('/')}
                </div>
            :                
            <div>
                <header className={styles.header}>
                    <div className="container">
                        <div className={styles.header__content}>
                            <Link to="/" className={styles.header__link}>
                                <div className={styles.logo}>
                                    <img className={styles.logo__img} src={logo} alt="logo"></img>
                                    <h1 className={styles.logo__h1}>Помогай</h1>
                                </div>
                            </Link>
                            <nav className={styles.nav}>
                                <div>
                                    <Link className={styles.nav__auth} to="/login">Вход</Link>
                                </div>
                                <div className={styles.nav__box}>
                                    <Link className={styles.nav__reg} to="/register">Регистрация</Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
                <article className={styles.main}>
                    <div className="container">
                        <div className={styles.main__content}>
                            <div className={styles.main__register}>
                                <h2 className={styles.main__h2}>Вход</h2>
                                <div className={styles.main__vvod}>
                                    {(emailDirty && emailErorr) && <div style={{color:"red"}}>{emailErorr}</div>}
                                    <input onBlur={blurHandler} name="email" value={email} onChange={emailChange} type="email" placeholder="Email" className={styles.main__input}></input>
                                    {(passwordDirty && passwordErorr) && <div style={{color:"red"}}>{passwordErorr}</div>}
                                    <input onBlur={blurHandler} name="password" value={password} onChange={passwordChange} type="password" placeholder="Пароль" className={styles.main__input}></input>
                                    <button disabled={!formValid} onClick={authUser} className={styles.main__btn}>Войти</button>
                                    {response == "Invalid password"  ? 
                                        <div style={{color:"blue", textAlign: 'center', marginTop: "10px"}}>Вы ввели неверный пароль! Попробуйте снова</div> 
                                        : 
                                        <div></div> 
                                    }   
                                    {response == "User not found"  ? 
                                        <div style={{color:"blue", textAlign: 'center', marginTop: "10px"}}>Вы ввели неверную почту! Попробуйте снова</div> 
                                        : 
                                        <div></div> 
                                    }   
                                    <p className={styles.main__p}>Нет аккаунта? <Link to="/register">Создайте.</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <footer className={styles.footer}>
                    <div className="container">
                        <div className={styles.footer__logo}>
                            <img src={logowhite} alt="logowhite"></img>
                            <h2 className={styles.footer__h2}>Помогай</h2>
                        </div>  
                    </div>
                </footer>
            </div>
            }
        </div>
    );
}

export default Login;