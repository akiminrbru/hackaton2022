import React, { useContext } from "react";
import styles from './Lending.module.css';
import { Link, useNavigate } from "react-router-dom";
import logo from './../../img/logo.svg';
import {Context} from './../../context';
import logowhite from './../../img/logo2.svg';

const Lending = () => {

    const navigate = useNavigate();

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
            <article className={styles.main}>
                <div className={styles.main__contentimage}>
                    <div className="container">
                        <div className={styles.main__title}>
                            <h2>Сделай этот мир лучше</h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className={styles.main__content}>
                        <div className={styles.main__help}>
                            <div className={styles.main__helpleft}>
                                <h3>ХОЧУ ПОМОЧЬ</h3>
                                <p>
                                    Если вы хотите помочь, но 
                                    не знаете куда обратится?
                                    У нас вы точно найдете того,
                                    кому нужна помощь!
                                </p>
                                <button onClick={()=>navigate('/register')}>Присоединиться</button>
                            </div>
                            <div className={styles.main__helpright}>
                                <h3>НУЖНА ПОМОЩЬ</h3>
                                <p>
                                    Ищите волонтеров?
                                    Присоединяесть к нам,
                                    у нас вы точно найдете того,
                                    кто готов вам помочь!
                                </p>
                                <button onClick={()=>navigate('/register')}>Присоединиться</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.main__allevent}>
                    <div className="container">
                        <div className={styles.main__alleventContent}>
                            <h3>
                                Стань волонтёром в пару кликов!
                            </h3>
                            <button onClick={() => navigate('/events')}>Все мероприятия</button>
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

export default Lending;