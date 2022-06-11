import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './CreateEvent.module.css';
import logo from './../../img/logo.svg';
import logowhite from './../../img/logo2.svg';
import {Context} from './../../context';
import axios from "axios";
import { useRef } from "react";


const CreateEvent = () => {

    const {loginStatus, setLoginStatus} = useContext(Context);

    const navigate = useNavigate();

    function disAuth() {
        localStorage.removeItem("token");
        navigate('/');
        setLoginStatus(false);
    }

    // useEffect(() => {
    //     if (loginStatus == false) {
    //         navigate('/');
    //     }
    // }, []);


    const nextDay = new Date()
    nextDay.setDate(nextDay.getDate()+1)
    const imageRef = useRef();

    const [eventData, setEventData] = useState(() => {
        return {
            title:'', 
            description:'', 
            location:'', 
            startDate: new Date(), 
            endDate: nextDay, 
            tags: [], 
            difficulty:'', 
            participateWays:'',
            company:'', 
            vacancySphere:'', 
            workType:'', 
            vacancyName:'', 
            requirements:'', 
            tasks:'', 
            deadlines:'', 
            age:'', 
            contactEmail:'',
            conditions:'', 
            salary:'',
            awards:'', 
            coins:'', 
            services:''
        }
    });

    const [file, setFile] = useState();

    const changeInputEvent = event => {
        event.persist()
        setEventData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleFileChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const fileObject = event.target.files[0];
        if (!fileObject) return;
        console.log(fileObject)
        
        setFile(fileObject)

        console.log(file)
    }

    const create = () => {
        let fd = new FormData()
        for (let el in eventData) {
            fd.append(el, eventData[el])
        }
        fd.append('file', file)
        console.log(fd)

        axios.post("http://hack.mysecrets.site/api/event",
            fd,{
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => console.log(res))
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
                <div className="container">
                    <div className={styles.main__content}>
                        <div className={styles.main__register}>
                            <h2 className={styles.main__h2}>Создание мероприятия</h2>
                            <div className={styles.main__vvod}>
                                <div className={styles.main__vvodleft}>
                                    <input name="title"           onChange={changeInputEvent} value={eventData.title} type="text" placeholder="Название мероприятия *" className={styles.main__input}></input>
                                    <input name="description"     onChange={changeInputEvent} value={eventData.description} type="text" placeholder="Описание *" className={styles.main__input}></input>
                                    <input name="file"     onChange={handleFileChange} ref={imageRef} accept="image/*" type="file" placeholder="Описание *" className={styles.main__input + ' ' + styles.main__inputfile}></input>
                                    <input name="location"        onChange={changeInputEvent} value={eventData.location} type="text" placeholder="Местоположение *" className={styles.main__input}></input>
                                    <input name="startDate"       onChange={changeInputEvent} value={eventData.startDate.toLocaleDateString('en-CA')} type="date" className={styles.main__input + ' ' + styles.main__inputdate} />
                                    <input name="endDate"         onChange={changeInputEvent} value={eventData.endDate.toLocaleDateString('en-CA')} type="date" className={styles.main__input + ' ' + styles.main__inputdate} />
                                    <input name="difficulty"      onChange={changeInputEvent} value={eventData.difficulty} type="text" placeholder="Сложность *" className={styles.main__input}></input>
                                    <input name="participateWays" onChange={changeInputEvent} value={eventData.participateWays} type="text" placeholder="Способ участия *" className={styles.main__input}></input>
                                    <input name="company"         onChange={changeInputEvent} value={eventData.company} type="text" placeholder="Название компании *" className={styles.main__input}></input>
                                </div>
                                <div className={styles.main__vvodright}> 
                                    <input name="workType"        onChange={changeInputEvent} value={eventData.workType} type="text" placeholder="Тип работы" className={styles.main__input}></input>
                                    <input name="requirements"    onChange={changeInputEvent} value={eventData.requirements} type="text" placeholder="Требования к кандидату" className={styles.main__input}></input>
                                    <input name="tasks"           onChange={changeInputEvent} value={eventData.tasks} type="text" placeholder="Задачи" className={styles.main__input}></input>
                                    <input name="deadlines"       onChange={changeInputEvent} value={eventData.deadlines} type="text" placeholder="Сроки" className={styles.main__input}></input>
                                    <input name="contactEmail"    onChange={changeInputEvent} value={eventData.contactEmail} type="email"placeholder="Контактная почта" className={styles.main__input}></input>
                                    <input name="salary"          onChange={changeInputEvent} value={eventData.salary} type="text" placeholder="Заработная плата" className={styles.main__input}></input>
                                    <input name="awards"          onChange={changeInputEvent} value={eventData.awards} type="text" placeholder="Награды для волонтеров" className={styles.main__input}></input>
                                    <input name="coins"           onChange={changeInputEvent} value={eventData.coins} type="text" placeholder="Количество монет" className={styles.main__input}></input>
                                    <input name="services"        onChange={changeInputEvent} value={eventData.services} type="text" placeholder="Доступный сервис для волонтеров" className={styles.main__input}></input>
                                    <input name="vacancySphere"   onChange={changeInputEvent} value={eventData.vacancyName} type="text" placeholder="Сфера вакансии" className={styles.main__input}></input>
                                </div>
                            </div>
                            <div className={styles.main__vvodbtn}>
                                <button onClick={() => create()} className={styles.main__btn}>Создать</button>
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