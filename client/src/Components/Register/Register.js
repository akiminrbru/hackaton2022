import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Register.module.css';
import logo from './../../img/logo.svg';
import logowhite from './../../img/logo2.svg';
import axios from 'axios';
import {Context} from './../../context';


const Register = () => {
    const {loginStatus, setLoginStatus} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(loginStatus)
        if (loginStatus === true) {
            navigate('/');
        }
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    function emailChange(event) {
        setEmail(event.target.value);
    }

    function passwordChange(event) {
        setPassword(event.target.value);
    }

    function firstNameChange(event) {
        setFirstName(event.target.value);
    }

    function lastNameChange(event) {
        setLastName(event.target.value);
    }

    function createUser() {
        const user = {
            email,
            lastName,
            firstName,
            password
        }

        axios.post("http://hack.mysecrets.site/api/auth/registration", user).then(res => console.log(res));

        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
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
                                <Link className={styles.header__link} to="/"> 
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
                                    <h2 className={styles.main__h2}>Регистрация пользователя</h2>
                                    <div className={styles.main__vvod}>
                                        <input value={email} onChange={emailChange} type="email" placeholder="Email" className={styles.main__input}></input>
                                        <input value={password} onChange={passwordChange} type="password" placeholder="Пароль" className={styles.main__input}></input>
                                        <input type="password" placeholder="Повторите пароль" className={styles.main__input}></input>
                                        <input value={firstName} onChange={firstNameChange} placeholder="Имя" className={styles.main__input}></input>
                                        <input value={lastName} onChange={lastNameChange} placeholder="Фамилия" className={styles.main__input}></input>
                                        <button onClick={createUser} className={styles.main__btn}>Зарегистрироваться</button>
                                        <p className={styles.main__p}>Уже есть аккаунт? <Link to="/login">Войдите.</Link></p>
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

export default Register;