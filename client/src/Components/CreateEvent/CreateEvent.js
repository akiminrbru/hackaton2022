import React from "react";
import { Link } from "react-router-dom";
import styles from './CreateEvent.module.css';
import logo from './../../img/logo.svg';
import logowhite from './../../img/logo2.svg';

const CreateEvent = () => {
    return (
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
                                <Link className={styles.nav__auth} to="/login">Вернуться в профиль</Link>
                            </div>
                            <div className={styles.nav__box}>
                                <Link className={styles.nav__reg} to="/register">Выйти</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <article className={styles.main}>
                <div className="container">
                    <div className={styles.main__content}>
                        <div className={styles.main__register}>
                            <h2 className={styles.main__h2}>Создание мероприятия</h2>
                            <div className={styles.main__vvod}>
                                <input placeholder="Название мероприятия" className={styles.main__input}></input>
                                <input placeholder="Описание" className={styles.main__input}></input>
                                <input placeholder="Местоположение" className={styles.main__input}></input>
                                <input placeholder="Время начала" className={styles.main__input}></input>
                                <input placeholder="Способ участия" className={styles.main__input}></input>
                                <input placeholder="Ваш email " className={styles.main__input}></input>
                                <input type="email" placeholder="Картинка" className={styles.main__input}></input>
                                <button className={styles.main__btn}>Создать</button>
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

export default CreateEvent;