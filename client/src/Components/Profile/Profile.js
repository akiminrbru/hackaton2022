import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Profile.module.css';
import logo from './../../img/logo.svg';
import logowhite from './../../img/logo2.svg';
import profile_icon from './../../img/profile_icon.svg';


const Profile = () => {
    const navigate = useNavigate();
    function disAuth() {
        localStorage.removeItem("token");
        navigate('/');
    }

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
                                <button onClick={disAuth} className={styles.nav__disauth}>Покинуть аккаунт</button>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <article>
            <div className="profile_container">
            <div className={styles.main__content}>
                        <div className={styles.card__profile}>
                            
                            <div className={styles.wrapper}>
                                <div className={styles.user}>
                                <img className={styles.profile_img} src={profile_icon} alt="logo"></img>
                                </div>
                            </div>
                            <div className={styles.profile_data}>
                            <h2>
                                Иван Иванов
                            </h2>
                            <p>Посещено мероприятий</p>
                            <div className={styles.profile_rating}>
                                <p className={styles.rating_p}>Репутация</p>
                                <p className={styles.rating_p}>Отзывы о волонтере</p>
                            </div>
                            </div>
                            <div className={styles.contacts}>
                                <h3>Контактная информация</h3>
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
    );
}

export default Profile;