import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './CreateEvent.module.css';
import logo from './../../img/logo.svg';
import logowhite from './../../img/logo2.svg';
import {Context} from './../../context';
import axios from "axios";
import { useRef } from "react";


const CreateEvent = ({email}) => {

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

    const [eventData, setEventData] = useState({
            title:'', 
            description:'', 
            location:'', 
            startDate: new Date(),
            endDate: nextDay,
            tags: '',
            difficulty:'easy', 
            participateWays:'offline',
            company:'', 
            vacancySphere:'', 
            workType:'', 
            vacancyName:'', 
            requirements:'', 
            tasks:'', 
            deadlines:'', 
            age:'', 
            contactEmail: email ||'',
            conditions:'', 
            salary:'',
            awards:'', 
            coins:'', 
            services:'',
            audience:'',
            typeOfEvent:'event'
        });

    const [eventDataDirty, setEventDataDirty] = useState({
            title:'', 
            description:'', 
            location:'', 
            startData: '',
            company:'', 
            age:'', 
        });

    const [eventDataErorr, setEventDataErorr] = useState({
        title:'Поле не должно быть пустым.', 
        description:'Поле не должно быть пустым.', 
        location:'Поле не должно быть пустым.', 
        startData: 'Поле не должно быть пустым.',
        company: 'Поле не должно быть пустым.', 
        age:'Поле не должно быть пустым.', 
    });    

    const [formValid, setFormValid] = useState(false);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'title':
                setEventDataDirty({...eventDataDirty, title: true});
                break;
            case 'description':
                setEventDataDirty({...eventDataDirty, description: true});
                console.log(eventDataDirty)
                break;
            case 'location':
                setEventDataDirty({...eventDataDirty, location: true});
                break;    
            case 'startDate':
                setEventDataDirty({...eventDataDirty, startDate: true});
                break;
            case 'company':
                setEventDataDirty({...eventDataDirty, company: true});
                break;
            case 'age':
                setEventDataDirty({...eventDataDirty, age: true});
                break;
            
        }
    }

    useEffect(() => {
        if (eventDataErorr.title || eventDataErorr.description || eventDataErorr.location || eventDataErorr.startDate || eventDataErorr.company || eventDataErorr.age) {
            setFormValid(false);
            console.log(eventDataErorr.title)
        } else {
            setFormValid(true);
        }
    }, [eventDataErorr.title, eventDataErorr.description, eventDataErorr.location, eventDataErorr.startDate, eventDataErorr.company, eventDataErorr.age])

    const [file, setFile] = useState();

    const changeInputEvent = (event) => {
        setEventData({...eventData, [event.target.name]: event.target.value})

        if(!event.target.value) {
            setEventDataErorr({...eventDataErorr, [event.target.name]: "Поле не должно быть пустым."});
        }
        else {
            setEventDataErorr({...eventDataErorr, [event.target.name]: ""});
        }
    }

    const handleFileChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const fileObject = event.target.files[0];
        if (!fileObject) return;
        setFile(fileObject)
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
        navigate('/events')
    }

    return (
        <div>
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.header__content}>
                        <Link className={styles.header__link} to='/'>
                            <div className={styles.logo}>
                                <img className={styles.logo__img} src={logo} alt="logo"/>
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
                                    <select name="typeOfEvent"     onChange={changeInputEvent} value={eventData.typeOfEvent} placeholder="Тип мероприятия" className={styles.main__input}>
                                        <option value="work">Работа</option>
                                        <option value="event">Мероприятия</option>
                                    </select>
                                    {(eventDataDirty.title && eventDataErorr.title) && <div style={{color:"red"}}>{eventDataErorr.title}</div>}
                                    <input onBlur={blurHandler} name="title"           onChange={changeInputEvent} value={eventData.title} type="text" placeholder={eventData.typeOfEvent==="work" ? "Наименование вакансии*":"Название мероприятия*"} className={styles.main__input}/>
                                    {(eventDataDirty.description && eventDataErorr.description) && <div style={{color:"red"}}>{eventDataErorr.description}</div>}
                                    <textarea onBlur={blurHandler} name="description"  onChange={changeInputEvent} value={eventData.description}  placeholder={eventData.typeOfEvent==="work" ? "Описание вакансии*":"Описание мероприятия*"} className={styles.main__input + ' ' + styles.main__textarea}/>
                                    <input name="file"            onChange={handleFileChange} ref={imageRef} accept="image/*" type="file" placeholder="Описание *" className={styles.main__input + ' ' + styles.main__inputfile}/>
                                    {(eventDataDirty.location && eventDataErorr.location) && <div style={{color:"red"}}>{eventDataErorr.location}</div>}
                                    <input onBlur={blurHandler} name="location"        onChange={changeInputEvent} value={eventData.location} type="text" placeholder="Местоположение *" className={styles.main__input}/>
                                    {(eventDataDirty.startDate && eventDataErorr.startDate) && <div style={{color:"red"}}>{eventDataErorr.startDate}</div>}
                                    <input onBlur={blurHandler} name="startDate"       onChange={changeInputEvent} value={eventData.startDate} type="date" className={styles.main__input + ' ' + styles.main__inputdate} />
                                    <input onBlur={blurHandler} name="endDate"         onChange={changeInputEvent} value={eventData.endDate} type="date" className={styles.main__input + ' ' + styles.main__inputdate} />
                                    <select onBlur={blurHandler} name="difficulty"     onChange={changeInputEvent} value={eventData.difficulty} placeholder="Сложность *" className={styles.main__input}>
                                        <option value="easy">Легкий</option>
                                        <option value="medium">Средний</option>
                                        <option value="hard">Сложный</option>
                                        <option value="other">Особые навыки</option>
                                    </select>
                                    <select onBlur={blurHandler} name="participateWays"onChange={changeInputEvent} value={eventData.participateWays} placeholder="Способ участия *" className={styles.main__input}>
                                        <option value="online">Онлайн</option>
                                        <option value="offline">Оффлайн</option>
                                        <option value="mixed">Смешанный</option>
                                    </select>
                                    {(eventDataDirty.company && eventDataErorr.company) && <div style={{color:"red"}}>{eventDataErorr.company}</div>}
                                    <input onBlur={blurHandler} name="company"         onChange={changeInputEvent} value={eventData.company} type="text" placeholder="Название компании *" className={styles.main__input}/>
                                    {(eventDataDirty.age && eventDataErorr.age) && <div style={{color:"red"}}>{eventDataErorr.age}</div>}
                                    <input onBlur={blurHandler} name="age"             onChange={changeInputEvent} value={eventData.age} type="number" placeholder="Ограничения на возраст *" className={styles.main__input}/>
                                </div>
                                <div className={styles.main__vvodright}> 
                                    <input name="workType"        onChange={changeInputEvent} value={eventData.workType} type="text" placeholder="Тип работы" className={styles.main__input}/>
                                    <textarea name="requirements" onChange={changeInputEvent} value={eventData.requirements} placeholder="Требования к кандидату" className={styles.main__input + ' ' + styles.main__textarea}/>
                                    <textarea name="tasks"        onChange={changeInputEvent} value={eventData.tasks} placeholder="Задачи" className={styles.main__input + ' ' + styles.main__textarea} />
                                    <input name="deadlines"       onChange={changeInputEvent} value={eventData.deadlines} type="text" placeholder="Сроки" className={styles.main__input}/>
                                    <input name="contactEmail"    onChange={changeInputEvent} value={eventData.contactEmail} type="email"placeholder="Контактная почта" className={styles.main__input}/>
                                    {eventData.typeOfEvent==="work" &&
                                        <Fragment>
                                            <input name="salary"          onChange={changeInputEvent} value={eventData.salary} type="number" placeholder="Заработная плата" className={styles.main__input}/>
                                            <input name="audience"          onChange={changeInputEvent} value={eventData.audience} type="text" placeholder="Целевая аудитория" className={styles.main__input}/>
                                        </Fragment>
                                    }

                                    {eventData.typeOfEvent==="event" &&
                                        <Fragment>
                                            <input name="awards"          onChange={changeInputEvent} value={eventData.awards} type="text" placeholder="Награды для волонтеров" className={styles.main__input}/>
                                            <input name="services"        onChange={changeInputEvent} value={eventData.services} type="text" placeholder="Доступный сервис для волонтеров" className={styles.main__input}/>
                                        </Fragment>
                                    }
                                    
                                    <input name="vacancySphere"   onChange={changeInputEvent} value={eventData.vacancySphere} type="text" placeholder="Сфера вакансии" className={styles.main__input}/>
                                </div>
                            </div>
                            <div className={styles.main__vvodbtn}>
                                <button disabled={!formValid} onClick={() => create()}  className={styles.main__btn}>Создать</button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <footer className={styles.footer}>
                <div className="container">
                    <div className={styles.footer__logo}>
                        <img src={logowhite} alt="logowhite"/>
                        <h2 className={styles.footer__h2}>Помогай</h2>
                    </div>  
                </div>
            </footer>
        </div>
    );
}

export default CreateEvent;