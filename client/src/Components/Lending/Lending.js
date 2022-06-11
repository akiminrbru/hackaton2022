import React, { useContext } from "react";
import styles from './Lending.module.css';
import { Link } from "react-router-dom";
import logo from './../../img/logo.svg';
import {Context} from './../../context';

const Lending = () => {

    const {loginStatus, setLoginStatus} = useContext(Context);
    return (
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
                        <div>
                            {loginStatus ?
                            <nav className={styles.nav}>
                                <div>
                                <Link className={styles.nav__profile} to="/profile">Профиль</Link>
                                </div>
                            </nav>
                            :
                            <nav className={styles.nav}>
                                <div>
                                    <Link className={styles.nav__auth} to="/login">Вход</Link>
                                </div>
                                <div className={styles.nav__box}>
                                    <Link className={styles.nav__reg} to="/register">Регистрация</Link>
                                </div>
                            </nav>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Lending;