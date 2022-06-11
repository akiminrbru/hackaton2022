import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import logo from './../../img/logo.svg';
import logowhite from './../../img/logo2.svg';
import axios from "axios";
import {Context} from './../../context';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function emailChange(event) {
        setEmail(event.target.value);
    }

    function passwordChange(event) {
        setPassword(event.target.value);
    }

    const {loginStatus, setLoginStatus} = useContext(Context);

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
        }).catch(function (error) {
            console.log(error);
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
                                    <input value={email} onChange={emailChange} type="email" placeholder="Email" className={styles.main__input}></input>
                                    <input value={password} onChange={passwordChange} type="password" placeholder="Пароль" className={styles.main__input}></input>
                                    <button onClick={authUser} className={styles.main__btn}>Войти</button>
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