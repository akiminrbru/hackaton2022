import React from "react";
import { Link } from "react-router-dom";
import styles from './Profile.module.css';
import logo from './../../img/logo.svg';
import logowhite from './../../img/logo2.svg';

const Profile = () =>
{
    return(
        <div>
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.header__content}>
                        <div className={styles.logo}>
                            <img className={styles.logo__img} src={logo} alt="logo"></img>
                            <h1 className={styles.logo__h1}>Помогай</h1>
                        </div>
                        <nav className={styles.nav}>
                            <div>
                                <a className={styles.nav__disauth} href="#">Покинуть аккаунт</a>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    );
}
export default Profile;