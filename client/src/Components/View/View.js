import React, {useContext, useState, useEffect, Fragment} from "react";
import classes from "./View.module.scss";
import img1 from "../../img/img1.png";
import styles from './View.module.css';
import logo from './../../img/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import logowhite from './../../img/logo2.svg';
import {Context} from './../../context';
import axios from "axios";
import { useParams } from "react-router-dom"
import kartinka from './../../img/defaultimage.jpg';

const View = () => {
    const [information, setInformation] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isSubscribed, setSubscribed] = useState(false)
    const [isCreator, setCreator] = useState(false)
    const [userId, setUserId] = useState('')
    const { id } = useParams()

    useEffect(() => {

        axios.get("http://hack.mysecrets.site/api/event/"+id, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json;charset=utf-8",
                }
        }).then(res => {
            console.log(res.data)
            setInformation(res.data.info)
            setUserId(res.data.user_id)
            setCreator(res.data.isCreator)

            if (information?.subscribers) {
                let subs = information?.subscribers
                for (let i = 0; i < subs.length; i++) {
                    if (subs[i].user===userId) {
                        setSubscribed(true)
                    }
                }
            }
            setIsLoaded(true)

        })
    }, []);

    function subscribe() {
        axios.get("http://hack.mysecrets.site/api/event/subs/"+information._id, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json;charset=utf-8",
            }
        }).then(res => {
            console.log(res.data);


        })
    }

    const formatDate = (date) => {
        return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
    }

    const {loginStatus, setLoginStatus} = useContext(Context);

    const navigate = useNavigate();

    function disAuth() {
        localStorage.removeItem("token");
        navigate('/');
        setLoginStatus(false);
    }
    
    return (
        <div>
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.header__content}>
                        <Link className={styles.header__link} to='/'>
                            <div className={styles.logo}>
                                <img className={styles.logo__img} src={logo} alt="logo"></img>
                                <h1 className={styles.logo__h1}>Помогай</h1>
                            </div>
                        </Link>
                        <nav className={styles.nav}>
                            <div>
                                <Link className={styles.nav__auth} to="/profile">Вернуться в профиль</Link>
                            </div>
                            <div className={styles.nav__box}>
                                <button className={styles.nav__disauth} onClick={disAuth} to="/">Выйти</button>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <article className={styles.main}>
                <div className={"content"}>
                {isLoaded ?
                    <div className={classes.View}>
                        <div className={styles.backtoevent}>
                            <Link className={styles.nav__backtoevent} to="/events">Вернуться к списку мероприятий</Link>
                        </div>
                        <h1>{information.title} </h1>
                        <div className={classes.banner}>
                            <div><img className={classes.banner_img} src={information.img || kartinka}/></div>
                                <div className={classes.col_item}>
                                    
                                    <h3>
                                        {information.title}
                                    </h3>
                                    <hr/>
                                    <div className={classes.row_item}>
                                    <div className={classes.row_it}>
                                        <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.49929 0C3.62805 0 0.478516 3.14948 0.478516 7.02077C0.478516 10.7688 6.87898 18.5092 7.15144 18.8368C7.23739 18.9402 7.36484 19 7.49929 19C7.63368 19 7.76119 18.9402 7.84714 18.8368C8.11965 18.5091 14.5201 10.7688 14.5201 7.02077C14.5201 3.14948 11.3706 0 7.49929 0ZM7.49929 17.8297C6.93176 17.121 5.75261 15.6112 4.58577 13.8851C2.49071 10.7861 1.38328 8.41242 1.38328 7.02077C1.38328 3.64836 4.12694 0.904762 7.49929 0.904762C10.8716 0.904762 13.6153 3.64836 13.6153 7.02077C13.6153 8.41236 12.5079 10.786 10.4128 13.8851C9.2459 15.6112 8.06681 17.121 7.49929 17.8297Z" fill="#3D7199"/>
                                            <path d="M9.80083 12.9057C9.59382 12.7658 9.31256 12.8203 9.17274 13.0273C8.56227 13.931 7.87839 14.8781 7.1401 15.8424C6.98822 16.0407 7.02586 16.3247 7.22425 16.4765C7.30628 16.5394 7.40297 16.5698 7.49893 16.5698C7.63489 16.5698 7.76939 16.5087 7.85842 16.3924C8.60757 15.414 9.302 14.4523 9.92243 13.5338C10.0623 13.3268 10.0079 13.0456 9.80083 12.9057Z" fill="#3D7199"/>
                                            <path d="M7.49859 3.46777C5.45316 3.46777 3.78906 5.13187 3.78906 7.1773C3.78906 9.22272 5.45316 10.8868 7.49859 10.8868C9.54401 10.8868 11.2081 9.22272 11.2081 7.1773C11.2081 5.13187 9.54401 3.46777 7.49859 3.46777ZM7.49859 9.98206C5.95205 9.98206 4.69382 8.72384 4.69382 7.1773C4.69382 5.63076 5.95205 4.37254 7.49859 4.37254C9.04519 4.37254 10.3033 5.63076 10.3033 7.1773C10.3033 8.72384 9.04519 9.98206 7.49859 9.98206Z" fill="#3D7199"/>
                                        </svg>
                                        </div> 
                                        {information.location}
                                    </div>
                                    <div className={classes.row_item}>
                                    <div className={classes.row_it}>
                                    
                                            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.03908 0.25H20.0859C20.7975 0.25 21.375 0.826853 21.375 1.53908V19.5859C21.375 20.2975 20.7975 20.875 20.0859 20.875H2.03908C1.32752 20.8749 0.75 20.2975 0.75 19.5859V1.53908C0.75 0.826853 1.32752 0.25 2.03908 0.25Z" fill="#EDEEF0"/>
                                            <path d="M20.0859 0.25H2.03908C1.32752 0.25 0.75 0.826853 0.75 1.53908V4.76171H21.3749V1.53908C21.3749 0.826853 20.7975 0.25 20.0859 0.25Z" fill="#3D7199"/>
                                            <path d="M14.7221 11.1721C14.4952 11.1721 14.2593 11.2114 14.0743 11.2881L14.0536 11.2687C14.3927 10.8163 15.0611 10.1994 15.4723 9.7277C15.5954 9.58268 15.6882 9.46734 15.6882 9.33262C15.6882 8.98586 15.2454 8.62945 14.9586 8.62945C14.8755 8.62945 14.7627 8.62946 14.6499 8.69714C14.5268 8.77448 14.403 8.85115 14.3205 8.9279C13.2821 9.83347 11.7089 11.8766 11.7089 13.3307C11.7089 14.612 12.706 15.7199 14.2896 15.7199C15.8106 15.7199 16.8696 14.5836 16.8696 13.3307C16.8703 12.193 15.9557 11.1721 14.7221 11.1721ZM14.2902 14.3316C13.6734 14.3316 13.3131 13.8695 13.3131 13.3293C13.3131 12.7615 13.7037 12.3284 14.2902 12.3284C14.938 12.3284 15.2673 12.8195 15.2673 13.3293C15.2666 13.8888 14.8755 14.3316 14.2902 14.3316ZM9.58834 14.4225H7.63999C8.54489 13.3745 10.1955 12.0216 10.1955 10.661C10.1955 9.41644 9.14171 8.62305 7.83208 8.62305C6.52245 8.62305 5.33 9.61243 5.33 10.8466C5.33 11.2282 5.59552 11.5614 6.10667 11.5614C7.12891 11.5614 6.54366 9.97459 7.76829 9.97459C8.20461 9.97459 8.53466 10.3272 8.53466 10.7286C8.53466 11.0812 8.35354 11.3848 8.16212 11.64C7.35259 12.7177 6.39414 13.5988 5.51052 14.5688C5.40417 14.6867 5.26562 14.8627 5.26562 15.0683C5.26562 15.5195 5.62785 15.7148 6.09643 15.7148H9.65293C10.0571 15.7148 10.4193 15.5194 10.4193 15.0683C10.4191 14.6178 10.0563 14.4225 9.58834 14.4225Z" fill="#324D5B"/>
                                            <path d="M0.75 4.11719H21.3749V5.40627H0.75V4.11719Z" fill="#0D5185"/>
                                            <path d="M11.0625 1.53906C11.4189 1.53906 11.707 1.82778 11.707 2.1836C11.707 2.53942 11.4189 2.82814 11.0625 2.82814C10.7061 2.82814 10.418 2.53942 10.418 2.1836C10.418 1.82778 10.706 1.53906 11.0625 1.53906Z" fill="#0D5185"/>
                                            <path d="M20.0859 19.586H2.03908C1.32752 19.586 0.75 19.0084 0.75 18.2969V19.586C0.75 20.2975 1.32752 20.875 2.03908 20.875H20.0859C20.7975 20.875 21.375 20.2975 21.375 19.586V18.2969C21.3749 19.0084 20.7975 19.586 20.0859 19.586Z" fill="#C4C4C4"/>
                                            </svg>
                                        </div> 
                                        {formatDate(new Date(information.startDate))} - {formatDate(new Date(information.endDate))}
                                        
                                    </div>
                                    <div className={classes.btn}>
                                        {isCreator ?
                                                <button onClick={() => navigate('/panel/'+information._id)}> Перейти в панель управления</button>
                                            :
                                            <Fragment>
                                                {
                                                    isSubscribed ?
                                                        <div>Вы уже подписаны</div>
                                                        :
                                                        <button onClick={() => subscribe()}> Записаться</button>
                                                }
                                            </Fragment>

                                        }
                                    </div>
                                
                                </div>
                            
                        </div>
                        <div className={classes.contener}>
                            <div>
                                <h2>Основная информация</h2>

                                <p>Название: <span>{information.title}</span></p>
                                <p>Описание: <span>{information.description}</span></p>
                                <p>Местоположение: <span>{information.location}</span></p>
                                <p>Способ участия: <span>{information.participateWays}</span></p>
                                <p>Название компании: <span>{information.fullInfo.company}</span></p>
                                <p>Ограничения на возраст: <span>{information.fullInfo.age}</span></p>

                            </div>
                            <div>
                                <h2>Дополнительная информация</h2>
                                
                                <p>Тип работы: <span>{information.fullInfo.workType}</span></p>
                                <p>Требования к кандидатам: <span>{information.fullInfo.requirements}</span></p>
                                <p>Задачи: <span>{information.fullInfo.tasks}</span></p>
                                <p>Контактные данные: <span>{information.fullInfo.contactEmail}</span></p>

                            </div>
                        </div>
                    </div>
                    :
                    <div className={classes.View}>
                        <h1>Загрузка... </h1>
                    </div>
                    }
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

export default View;