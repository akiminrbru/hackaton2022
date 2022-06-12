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
        //console.log(loginStatus)
        if (loginStatus === true) {
            navigate('/');
        }
    }, []);

    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState('');
    const [emailErorr, setEmailError] = useState("Email не может быть пустым");

    const [password, setPassword] = useState('');
    const [passwordDirty, setPasswordDirty] = useState('');
    const [passwordErorr, setPasswordError] = useState("Пароль не может быть пустым");

    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordDirty, setRepeatPasswordDirty] = useState('');
    const [repeatPasswordErorr, setRepeatPasswordError] = useState("Пароли должны совпадать");


    const [firstName, setFirstName] = useState('');
    const [firstNameDirty, setFirstNameDirty] = useState('');
    const [firstNameErorr, setFirstNameError] = useState("Имя не должно быть пустым");


    const [lastName, setLastName] = useState('');
    const [lastNameDirty, setLastNameDirty] = useState('');
    const [lastNameErorr, setLastNameError] = useState("Фамилия не должна быть пустым");

    const [formValid, setFormValid] = useState(false);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            case 'firstName':
                setFirstNameDirty(true);
                break;
            case 'lastName':
                setLastNameDirty(true);
                break;
            case 'repeatPassword':
                setRepeatPasswordDirty(true);
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
        if (event.target.value.length < 3 || event.target.value.length > 12) {
            setPasswordError("Пароль должен быть длинее 3 и меншье 12");
            if(!event.target.value) {
                setPasswordError("Пароль не может быть пустым");
            }
        } else {
            setPasswordError("");
        }
    }
    
    function repeatPasswordChange(event) {
        setRepeatPassword(event.target.value);

        if (event.target.value !== password) {
            setRepeatPasswordError("Пароли должны совпадать");
        } else {
            setRepeatPasswordError("");
        }
    }

    function firstNameChange(event) {
        setFirstName(event.target.value);
        if(!event.target.value) {
            setFirstNameError("Имя не может быть пустым");
        } else {
            setFirstNameError("");
        }
    }

    function lastNameChange(event) {
        setLastName(event.target.value);
        if(!event.target.value) {
            setLastNameError("Фамилия не может быть пустой");
        } else {
            setLastNameError("");
        }
    }

    useEffect(() => {
        if (emailErorr || passwordErorr || firstNameErorr || lastNameErorr || repeatPasswordErorr) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailErorr, passwordErorr, firstNameErorr, lastNameErorr, repeatPasswordErorr])
    

    const [response, setResponse] = useState();

    async function createUser() {
        const user = {
            email,
            lastName,
            firstName,
            password
        }

        await axios.post("http://hack.mysecrets.site/api/auth/registration", user)
        .then(res => {
            //console.log(res);
            setResponse(res.data.message);
        })
        .catch(res => {
            //console.log(res);
            setResponse(res.response.data.message);
        });

        //await console.log(response);

        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setFirstName("");
        setLastName("");
    }

    // useEffect(() => {
    //     console.log(response);
    // }, [response])

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
                                        {(emailDirty && emailErorr) && <div style={{color:"red"}}>{emailErorr}</div>}
                                        <input onBlur={blurHandler} value={email} onChange={emailChange} name="email" type="email" placeholder="Email" className={styles.main__input}></input>
                                        {(passwordDirty && passwordErorr) && <div style={{color:"red"}}>{passwordErorr}</div>}
                                        <input onBlur={blurHandler} value={password} name="password" onChange={passwordChange} type="password" placeholder="Пароль" className={styles.main__input}></input>
                                        {(repeatPasswordDirty && repeatPasswordErorr) && <div style={{color:"red"}}>{repeatPasswordErorr}</div>}
                                        <input onBlur={blurHandler} value={repeatPassword} name="repeatPassword" onChange={repeatPasswordChange} type="password" placeholder="Повторите пароль" className={styles.main__input}></input>
                                        {(firstNameDirty && firstNameErorr) && <div style={{color:"red"}}>{firstNameErorr}</div>}
                                        <input onBlur={blurHandler} value={firstName} onChange={firstNameChange} name="firstName" placeholder="Имя" className={styles.main__input}></input>
                                        {(lastNameDirty && lastNameErorr) && <div style={{color:"red"}}>{lastNameErorr}</div>}
                                        <input onBlur={blurHandler} value={lastName} onChange={lastNameChange} name="lastName" placeholder="Фамилия" className={styles.main__input}></input>
                                        <button disabled={!formValid} onClick={createUser} className={styles.main__btn}>Зарегистрироваться</button>
                                        {response == "User was created"  ? 
                                        <div style={{color:"blue", textAlign: 'center', marginTop: "10px"}}>Вы успешно зарегистрировались!</div> 
                                        : 
                                        <div></div> 
                                        }   
                                        {response == "User with this email already exist"  ? 
                                        <div style={{color:"blue", textAlign: 'center', marginTop: "10px"}}>Пользователь с такой почтой уже существует!</div> 
                                        : 
                                        <div></div> 
                                        }     
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


// {switch (response) {
//     case 'User was created':
//         <div style={{color:"blue", textAlign: 'center', marginTop: "10px"}}>Вы успешно зарегистрировались!</div>
//         break;
//     case 'User with this email already exist':
//         <div style={{color:"blue", textAlign: 'center', marginTop: "10px"}}>Вы успешно зарегистрировались!</div>
//         break;
//     case '':
//         <div></div>
//         break;
// }}

     