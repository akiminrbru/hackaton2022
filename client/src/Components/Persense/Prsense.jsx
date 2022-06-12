import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

export default function Prsense() {

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        axios.get("http://hack.mysecrets.site/api/event/persense/params?link="+id, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json;charset=utf-8",
            }
        }).then(res => {
            console.log(res.data)
            if (res.data.message==='Вас отметили') navigate('/profile')

        })
    })

    return (
        <h2>Подождите, идёт подтверждение вашего участия...</h2>
    )
}