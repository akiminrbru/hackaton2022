import ItemCard from "../ItemCard/itemCard"
import avatar_profile from "../../img/avatar_profile.png"
import classes from "./News.module.scss"

const body = {
    name:"Иван",
    surname:"Иванов",
    email:"vezhliviy@yandex.ru",
    phone:"+7 (999) 909-99-99",
    events:[
        {
            img:avatar_profile,
            title:"Благотворительная акция",
            location:"г. Ростов-на-Дону, пл. Гагарина 1",
            date:"27.05 - 29.05",
            id:""
        },
        {
            img:avatar_profile,
            title:"Благотворительная акция",
            location:"г. Ростов-на-Дону, пл. Гагарина 1",
            date:"27.05 - 29.05",
            id:""
        },
        {
            img:avatar_profile,
            title:"Благотворительная акция",
            location:"г. Ростов-на-Дону, пл. Гагарина 1",
            date:"27.05 - 29.05",
            id:""
        },
        {
            img:avatar_profile,
            title:"Благотворительная акция",
            location:"г. Ростов-на-Дону, пл. Гагарина 1",
            date:"27.05 - 29.05",
            id:""
        },
        {
            img:avatar_profile,
            title:"Благотворительная акция",
            location:"г. Ростов-на-Дону, пл. Гагарина 1",
            date:"27.05 - 29.05",
            id:""
        },
        {
            img:avatar_profile,
            title:"Благотворительная акция",
            location:"г. Ростов-на-Дону, пл. Гагарина 1",
            date:"27.05 - 29.05",
            id:""
        },
        {
            img:avatar_profile,
            title:"Благотворительная акция",
            location:"г. Ростов-на-Дону, пл. Гагарина 1",
            date:"27.05 - 29.05",
            id:""
        },
        {
            img:avatar_profile,
            title:"Благотворительная акция",
            location:"г. Ростов-на-Дону, пл. Гагарина 1",
            date:"27.05 - 29.05",
            id:""
        }

    ]
}


const News = ()=>{
    const {events} = body;
    return (
        <div className="content">
            
            <div className={classes.News}>
                <h1>Список мероприятий</h1>
                <div className={classes.items}>
                    {events.map((e,i)=>(
                        <ItemCard key={i} item={e}/>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default News