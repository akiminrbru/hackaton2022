import ItemCard from "./ItemCard/itemCard"
import avatar_profile from "../../img/avatar_profile.png"
import classes from "./News.module.scss"
import styles from "./News.module.css"
import { Link } from "react-router-dom";
import logo from './../../img/logo.svg';
import logowhite from './../../img/logo2.svg';
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import {Context} from './../../context';


const News = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("http://hack.mysecrets.site/api/event").then(res => {
            console.log(res)
            setEvents(res.data)
            setIsLoaded(true)
        })
    }, [isLoaded]);

    const {loginStatus, setLoginStatus} = useContext(Context);

    return (
        <div>
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.header__content}>
                        <div className={styles.logo}>
                            <img className={styles.logo__img} src={logo} alt="logo"></img>
                            <h1 className={styles.logo__h1}>Помогай</h1>
                        </div>
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
            </header>
            <article>
                <div className="content">
                    {isLoaded ?
                        <div className={classes.News}>
                            <h1>Список мероприятий</h1>
                            <div className={classes.items}>
                                {events.map((e,i)=>(
                                    <ItemCard key={e._id} item={e}/>
                                ))}
                            </div>
                        </div>
                    :   
                        <div className={classes.News}>
                            <h1>Загрузка....</h1>
                        </div>
                    }
                </div>
            </article>
        </div> 
    )
}

export default News;
