import classes from "./manpan.module.scss"
import React, {useContext, useState, useEffect, Fragment} from "react";
import axios from "axios";
import { Link,useParams} from "react-router-dom";
import styles from './ManPan.module.css';
import logo from './../../img/logo.svg';


const ManPan =()=>{
    const lvl =0
    const { id } = useParams()

    const [information, setInformation] = useState()
    const [qrCode, setQR] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {

        axios.get("http://hack.mysecrets.site/api/event/panel/"+id, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json;charset=utf-8",
            }
        }).then(res => {
            console.log(res.data.events)
            setInformation(res.data.events)
            setIsLoaded(true)

        })
    }, []);

    const formatDate = (date) => {
        return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
    }

    return(
        <div>
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
                                        <Link className={styles.nav__auth} to="/profile">Профиль</Link>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </header>
            </div>
            <div className={"content"}>
            {isLoaded ?
                <div className={classes.ManPan}>
                    <h1>Панель управления мероприятием</h1>
                    <div className={classes.search}> Поиск
                        <div className={classes.poisck}>
                            <input type="search" placeholder="Найти" /></div>
                    </div>
                    <div className={classes.flex}>
                        <div className={classes.row_man}>
                            <table>
                                <tbody>
                                {
                                    information.subscribers.map(sub => (
                                        <LineCard sub={sub} id={id}/>
                                    ))
                                }
                                </tbody>
                            </table>

                        </div>
                        <div className={classes.banner4}>
                            <div className={classes.col_items1}>
                                <div>
                                    <img src={information.img}/>
                                </div>
                                <div>
                                    <h3>{information.title}</h3>
                                </div>
                                <div className={classes.row_ittems}>
                                    <div className={classes.row_it2}>
                                        <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.49929 0C3.62805 0 0.478516 3.14948 0.478516 7.02077C0.478516 10.7688 6.87898 18.5092 7.15144 18.8368C7.23739 18.9402 7.36484 19 7.49929 19C7.63368 19 7.76119 18.9402 7.84714 18.8368C8.11965 18.5091 14.5201 10.7688 14.5201 7.02077C14.5201 3.14948 11.3706 0 7.49929 0ZM7.49929 17.8297C6.93176 17.121 5.75261 15.6112 4.58577 13.8851C2.49071 10.7861 1.38328 8.41242 1.38328 7.02077C1.38328 3.64836 4.12694 0.904762 7.49929 0.904762C10.8716 0.904762 13.6153 3.64836 13.6153 7.02077C13.6153 8.41236 12.5079 10.786 10.4128 13.8851C9.2459 15.6112 8.06681 17.121 7.49929 17.8297Z" fill="#3D7199"/>
                                            <path d="M9.80083 12.9057C9.59382 12.7658 9.31256 12.8203 9.17274 13.0273C8.56227 13.931 7.87839 14.8781 7.1401 15.8424C6.98822 16.0407 7.02586 16.3247 7.22425 16.4765C7.30628 16.5394 7.40297 16.5698 7.49893 16.5698C7.63489 16.5698 7.76939 16.5087 7.85842 16.3924C8.60757 15.414 9.302 14.4523 9.92243 13.5338C10.0623 13.3268 10.0079 13.0456 9.80083 12.9057Z" fill="#3D7199"/>
                                            <path d="M7.49859 3.46777C5.45316 3.46777 3.78906 5.13187 3.78906 7.1773C3.78906 9.22272 5.45316 10.8868 7.49859 10.8868C9.54401 10.8868 11.2081 9.22272 11.2081 7.1773C11.2081 5.13187 9.54401 3.46777 7.49859 3.46777ZM7.49859 9.98206C5.95205 9.98206 4.69382 8.72384 4.69382 7.1773C4.69382 5.63076 5.95205 4.37254 7.49859 4.37254C9.04519 4.37254 10.3033 5.63076 10.3033 7.1773C10.3033 8.72384 9.04519 9.98206 7.49859 9.98206Z" fill="#3D7199"/>
                                        </svg>
                                        <h4>{information.location}</h4>
                                    </div>
                                    <div className={classes.row_it2}>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.937513 0H14.0625C14.58 0 15 0.419529 15 0.937513V14.0625C15 14.58 14.58 15 14.0625 15H0.937513C0.420012 14.9999 0 14.58 0 14.0625V0.937513C0 0.419529 0.420012 0 0.937513 0Z" fill="#EDEEF0"/>
                                            <path d="M14.0625 0H0.937513C0.420012 0 0 0.419529 0 0.937513V3.28124H14.9999V0.937513C14.9999 0.419529 14.58 0 14.0625 0Z" fill="#3D7199"/>
                                            <path d="M10.1626 7.94371C9.99757 7.94371 9.826 7.97232 9.69144 8.02808L9.67645 8.01399C9.92301 7.68493 10.4091 7.23632 10.7082 6.89323C10.7977 6.78776 10.8652 6.70387 10.8652 6.6059C10.8652 6.35371 10.5432 6.0945 10.3346 6.0945C10.2741 6.0945 10.1921 6.0945 10.1101 6.14373C10.0206 6.19998 9.93051 6.25574 9.87051 6.31155C9.11534 6.97015 7.97117 8.45607 7.97117 9.51357C7.97117 10.4455 8.69635 11.2512 9.84802 11.2512C10.9543 11.2512 11.7244 10.4248 11.7244 9.51357C11.7249 8.68619 11.0597 7.94371 10.1626 7.94371ZM9.8485 10.2415C9.39988 10.2415 9.13789 9.90546 9.13789 9.51261C9.13789 9.09961 9.42195 8.78465 9.8485 8.78465C10.3196 8.78465 10.5591 9.14182 10.5591 9.51261C10.5586 9.9195 10.2741 10.2415 9.8485 10.2415ZM6.42895 10.3076H5.01197C5.67008 9.54544 6.87055 8.56154 6.87055 7.57202C6.87055 6.66686 6.10412 6.08984 5.15167 6.08984C4.19921 6.08984 3.33197 6.8094 3.33197 7.707C3.33197 7.98448 3.52508 8.22686 3.89683 8.22686C4.64027 8.22686 4.21463 7.07278 5.10528 7.07278C5.4226 7.07278 5.66263 7.3292 5.66263 7.62119C5.66263 7.87761 5.53091 8.09836 5.3917 8.28402C4.80295 9.06774 4.1059 9.70855 3.46326 10.414C3.38591 10.4998 3.28516 10.6277 3.28516 10.7773C3.28516 11.1054 3.54859 11.2475 3.88938 11.2475H6.47593C6.76984 11.2475 7.03328 11.1054 7.03328 10.7773C7.03317 10.4496 6.76931 10.3076 6.42895 10.3076Z" fill="#324D5B"/>
                                            <path d="M0 2.8125H14.9999V3.75001H0V2.8125Z" fill="#0D5185"/>
                                            <path d="M7.50001 0.9375C7.75921 0.9375 7.96876 1.14748 7.96876 1.40626C7.96876 1.66503 7.75921 1.87501 7.50001 1.87501C7.2408 1.87501 7.03125 1.66503 7.03125 1.40626C7.03125 1.14748 7.24075 0.9375 7.50001 0.9375Z" fill="#0D5185"/>
                                            <path d="M14.0625 14.0625H0.937513C0.420012 14.0625 0 13.6425 0 13.125V14.0625C0 14.58 0.420012 15 0.937513 15H14.0625C14.58 15 15 14.58 15 14.0625V13.125C14.9999 13.6425 14.58 14.0625 14.0625 14.0625Z" fill="#C4C4C4"/>
                                        </svg>
                                        <h4>27.05 - 29.05</h4>
                                    </div>
                                    <div className={classes.row_it2}>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.46373 7.17843C5.46373 8.28557 6.3923 9.21415 7.49944 9.21415C8.60658 9.21415 9.53516 8.28557 9.53516 7.17843C9.53516 6.07129 8.60658 5.14272 7.49944 5.14272C6.3923 5.14272 5.46373 6.07129 5.46373 7.17843ZM8.35659 11.5713C10.7494 11.0356 14.4637 7.857 14.4637 7.857C14.4637 7.857 11.7137 3.57129 8.03516 3.107C7.82087 3.07129 7.10659 3.07129 6.96373 3.07129C3.3923 3.42843 0.535156 7.96415 0.535156 7.96415C0.535156 7.96415 3.6423 11.0356 6.60659 11.4999C6.92801 11.6427 7.99944 11.6427 8.35659 11.5713ZM3.96373 7.39272C3.96373 5.53557 5.53516 4.03557 7.49944 4.03557C9.46373 4.03557 11.0352 5.53557 11.0352 7.39272C11.0352 9.24986 9.46373 10.7141 7.49944 10.7141C5.53516 10.7141 3.96373 9.21415 3.96373 7.39272Z" fill="#0D5185"/>
                                        </svg>
                                        <h4>{information.views}</h4>
                                    </div>
                                    <div className={classes.row_it2}>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.0794 12.2185C8.95239 12.2756 8.80888 12.2844 8.67586 12.2432L4.09762 10.3192C3.42027 10.1095 3.58868 9.41234 4.28912 9.52245L9.2415 9.80607C9.37906 9.82771 9.50401 9.89883 9.59287 10.006L10.2019 10.8463C10.2956 11.2108 10.2555 11.3833 9.99623 11.7323L9.0794 12.2185Z" fill="#0D5185"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5013 2.12533C4.98028 2.12533 2.1263 4.978 2.1263 8.4965C2.1263 10.2448 2.83044 11.8281 3.97162 12.9796L3.46848 13.4782C2.20125 12.1995 1.41797 10.4391 1.41797 8.4965C1.41797 4.58643 4.58946 1.41699 8.5013 1.41699C12.4131 1.41699 15.5846 4.58643 15.5846 8.4965C15.5846 10.492 14.7581 12.2951 13.4296 13.5816L12.9368 13.0727C14.1333 11.9141 14.8763 10.2923 14.8763 8.4965C14.8763 4.978 12.0223 2.12533 8.5013 2.12533Z" fill="#0D5185"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.14453 3.89583V2.125L8.85286 2.125V3.89583H8.14453Z" fill="#0D5185"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9987 13.1285L11.707 11.8368L12.2079 11.3359L13.4996 12.6276L12.9987 13.1285Z" fill="#0D5185"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.00223 5.14754L3.75 3.89542L4.25086 3.39453L5.50309 4.64667L5.00223 5.14754Z" fill="#0D5185"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3477 7.79199H15.1185V8.50033H13.3477V7.79199Z" fill="#0D5185"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.78906 7.79199H3.55991V8.50033H1.78906V7.79199Z" fill="#0D5185"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5391 4.60412L12.8308 3.3125L13.3317 3.8134L12.0399 5.10502L11.5391 4.60412Z" fill="#0D5185"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.02696 11.9081L3.73524 13.1998L3.23438 12.699L4.52606 11.4072L5.02696 11.9081Z" fill="#0D5185"/>
                                        </svg>
                                        <h4 style={{
                                            color:lvl===0?"#AD2929":lvl===1?"#FFCC15":"#5CBF41"
                                        }}>{lvl===0?"Высокая":lvl===1?"Средняя":"Низкая"}</h4>
                                    </div>

                                    <div className={classes.row_it2}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_743_12)">
                                                <path d="M13.5435 5.47825C13.7956 5.47825 14 5.27386 14 5.02172V3.19565C14 3.0116 13.8895 2.8456 13.7198 2.77453L7.17628 0.0353965C7.06352 -0.0117988 6.93648 -0.0117988 6.82371 0.0353965L0.280246 2.77453C0.110469 2.8456 0 3.0116 0 3.19565V5.02175C0 5.27386 0.204395 5.47828 0.456531 5.47828H1.06523V11.2954C0.456094 11.4342 0 11.9799 0 12.6304V13.5435C0 13.7956 0.204395 14 0.456531 14H13.5435C13.7956 14 14 13.7956 14 13.5435V12.6304C14 11.9799 13.5439 11.4342 12.9348 11.2954V5.47825H13.5435ZM13.087 12.6304V13.087H0.913035V12.6304C0.913035 12.3787 1.11784 12.1739 1.36957 12.1739C1.77261 12.1739 12.1147 12.1739 12.6304 12.1739C12.8822 12.1739 13.087 12.3787 13.087 12.6304ZM1.97827 11.2609V5.47825H2.8913V11.2609H1.97827ZM3.80436 11.2609V5.47825H5.63046V11.2609H3.80436ZM6.54347 11.2609V5.47825H7.4565V11.2609H6.54347ZM8.36957 11.2609V5.47825H10.1957V11.2609H8.36957ZM11.1087 11.2609V5.47825H12.0217V11.2609H11.1087ZM0.913035 4.56522V3.49944L7 0.951412L13.087 3.49944V4.56522C12.8363 4.56522 1.07548 4.56522 0.913035 4.56522Z" fill="#0D5185"/>
                                                <path d="M6.9995 3.49998C7.25164 3.49998 7.45603 3.29558 7.45603 3.04345C7.45603 2.79131 7.25164 2.58691 6.9995 2.58691C6.74736 2.58691 6.54297 2.79131 6.54297 3.04345C6.54297 3.29558 6.74736 3.49998 6.9995 3.49998Z" fill="#0D5185"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_743_12">
                                                    <rect width="14" height="14" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <h4>{information.fullInfo.company}</h4>
                                    </div>
                                </div>
                                <div className={classes.qr}>QR-код для отметки посещения
                                    <img src={'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://hack.mysecrets.site/persense/'+information.presenseLink}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            :
                <div className={classes.ManPan}>
                    <h1>Загрузка...</h1>
                </div>
            }

        </div>
        </div>
    )
}


function LineCard ({sub, id}) {

    const [hours, setHours] = useState(sub.hours||1)

    const setHoursApi = () => {
        axios.post("http://hack.mysecrets.site/api/event/panel/hours/"+id, {
            id: sub.user._id,
            hours
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json;charset=utf-8",
            }
        }).then(res => {
            console.log(res.data)
        })
    }

    return(
        <tr key={sub.user._id}>
            <td>
                <img src={sub.user?.avatar}/>
            </td>
            <td>
                <h2>{sub.user.lastName}</h2>
            </td>
            <td>
                <h2>{sub.user.firstName}</h2>
            </td>
            <td>
                <h2>{sub.user.email}</h2>
            </td>
            <td>
                <a>Оставить отзыв</a>
            </td>
            <td>
                <div>Отработано часов:
                    <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} min={1} max={20}  step={1}  />
                    <button onClick={() => setHoursApi()}>OK</button>
                </div>
            </td>
            <td>
                <p style={{
                    color:sub.presense?"#5CBF41":"#AD2929"
                }}>{sub.presense?"Присутствовал":"Отсутствовал"}</p>
            </td>
        </tr>
    )
}

export default ManPan;