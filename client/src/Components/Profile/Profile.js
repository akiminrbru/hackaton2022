import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Profile.module.css';
import logo from './../../img/logo.svg';
import logowhite from './../../img/logo2.svg';
import profile_icon from './../../img/profile_icon.svg';
import avatar_profile from "../../img/avatar_profile.png"
import classes from "./ProfileMain.module.scss"
import ItemCard from "../News/ItemCard/itemCard";
import {Context} from './../../context';
import axios from "axios";
import loader from './Loader.module.scss';


const ProfileCard = ({information})=>{

    return (
        <div className={classes.ProfileCard}>
            <div className={classes.userinfo}>
                <img src={information.avatar||avatar_profile}/>
                <h2>{information.firstName} {information.lastName}</h2>
                <p>Посещено мероприятий:</p>
                <p data-visited> {information.takePart}</p>
            </div>
            <div>
                <Link className={classes.createEvent} to="/createEvent">Создать мероприятие</Link>
            </div>
            <div>
                <Link className={classes.createEvent} to="/events">Список мероприятий</Link>
            </div>
            <div className={`${classes.userstats} ${classes.max_width}`}>
                <h2>Репутация: {information.reputation}</h2>
                <h2>Монет: {information.coins}</h2>
                <h2>Часов: {information.hours}</h2>
                <h2>Отзывы: </h2>
                <p></p>
            </div>
            <div className={`${classes.usercontacts} ${classes.max_width}`}>
                <h2>Контактная информация:</h2> 
                <div>
                    <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5914 8.91686C11.4153 9.04279 11.2076 9.10568 11 9.10568C10.7923 9.10568 10.5847 9.04279 10.4086 8.91686L1.99999 2.90068L6.66665e-05 1.46979L0 15.2849C6.66665e-05 15.8237 0.447732 16.2605 0.999997 16.2605L21 16.2605C21.5523 16.2605 22 15.8236 22 15.2849V1.46973L19.9999 2.90068L11.5914 8.91686Z" fill="#909ADE"/>
                        <path d="M10.9988 6.92061L20.6712 6.50076e-05L1.32617 0L10.9988 6.92061Z" fill="#909ADE"/>
                    </svg>
                    <a  href={`mailto:${information.email}`}>{information.email}</a>
                </div>
                <div>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.7749 15.9263C19.9931 14.4483 17.2785 12.8457 17.159 12.7756C16.8102 12.577 16.4462 12.4719 16.1056 12.4719C15.5991 12.4719 15.1845 12.704 14.9334 13.126C14.5363 13.601 14.0438 14.1563 13.9243 14.2423C12.9993 14.87 12.2752 14.7987 11.474 13.9974L7.00253 9.52485C6.2064 8.72862 6.13321 7.99546 6.75649 7.07541C6.84369 6.95509 7.39883 6.46217 7.87378 6.06463C8.17666 5.88436 8.38455 5.61648 8.47564 5.28787C8.59672 4.85062 8.50757 4.33628 8.22182 3.83517C8.15447 3.71992 6.55132 1.00454 5.07431 0.223102C4.79869 0.0770928 4.48802 0 4.17658 0C3.66348 0 3.18075 0.20013 2.81792 0.562622L1.82987 1.55042C0.267215 3.11291 -0.298441 4.8841 0.147699 6.81454C0.519872 8.42336 1.60447 10.1354 3.3719 11.9027L9.09658 17.6282C11.3335 19.8654 13.4661 21 15.4352 21C15.4352 21 15.4352 21 15.4356 21C16.8838 21 18.2339 20.3844 19.4473 19.1708L20.435 18.183C21.0353 17.583 21.1716 16.6758 20.7749 15.9263Z" fill="#909ADE"/>
                    </svg>
                    <a data-line-off href={`tel:${information.phoneNumber}`}>{information.phoneNumber}</a>
                </div>
            </div>
        </div>
    )
}

const Dashboard = ({events, events2})=>{
    return (
        <div className={classes.Dashboard}>
            <h2>Созданные мероприятия</h2>
            <div className={classes.DashboardItems}>
                {events.map((e,i)=>(
                    <ItemCard key={i} item={e}/>
                ))}
            </div>
            <h2>Посещенные мероприятия</h2>
            <div className={classes.DashboardItems}>
                {events2.map((e,i)=>(
                    <ItemCard key={i} item={e}/>
                ))}
            </div>
        </div>
    )
}

const Profile = () => {

    const {loginStatus, setLoginStatus} = useContext(Context);
    
    const navigate = useNavigate();

    function disAuth() {
        localStorage.removeItem("token");
        setLoginStatus(false);
        navigate('/');
    }

    // useEffect(() => {
    //     //console.log(loginStatus)
    //     if(loginStatus === false) {
    //         navigate("/");
    //     }
    // });

    const [information, setInformation] = useState();
    const [isLoaded, setSsLoaded] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("http://hack.mysecrets.site/api/user", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json;charset=utf-8",
                }
        }).then(res => {
            console.log(res.data);
            setInformation(res.data);

            axios.get("http://hack.mysecrets.site/api/user/events/"+res.data.id, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json;charset=utf-8",
            }
            }).then(res => {
                //console.log(res.data.createdEvents);
                setEvents(res.data.createdEvents);
                setSsLoaded(true)
            })

        })
    }, []);

    return(
        <div>
            {information ?
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
                                        <button onClick={disAuth} className={styles.nav__disauth}>Выйти</button>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </header>
                    <article>
                        <div className="container">
                            <div className={classes.Profile}>
                                <ProfileCard information={information}/>
                                {isLoaded ? 
                                <Dashboard events={events} events2={information.events}/>
                                : 
                                <div className={loader.loader + ' ' + loader.loader1}>
                                    <div>
                                        <div>
                                        <div>
                                            <div>
                                            <div>
                                                <div></div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                }
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
            :   
            <div className={loader.loader + ' ' + loader.loader1}>
                <div>
                    <div>
                    <div>
                        <div>
                        <div>
                            <div></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default Profile;