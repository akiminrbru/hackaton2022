const Event = require("../models/Event");
const User = require("../models/User")

class eventPanelController {

        async getInfo(req, res) {
                try {
                        if (req.params.id) {
                                const eventsFromBd = await Event.findOne({_id:req.params.id}).populate('subscribers.user', {
                                        password: 0, createdEventsN: 0, age: 0, registeredDate:0, events: 0, createdEvents: 0, __v: 0
                                })

                                if (eventsFromBd.user.toString()!==req.user.id)
                                        return res.status(403).json({message: "Доступ запрещен"})

                                return res.status(200).json({
                                        events: eventsFromBd
                                })
                        }
                        else {
                                return res.status(400).json({message: "Некорректный запрос"})
                        }

                } catch(e) {
                        console.log(e)
                        return res.status(400).json({message: "Ошибка при получении панели мероприятия"})
                }
        }

        async subscribe(req, res) {
                try {
                        if (req.params.id) {
                                let eventsFromBd = await Event.findOne({_id:req.params.id})
                                if (eventsFromBd)
                                for (let i = 0; i < eventsFromBd.subscribers.length; i++)
                                        if(eventsFromBd.subscribers[i]['user'])
                                                if (eventsFromBd.subscribers[i]['user'].toString()===req.user.id)
                                                        return res.status(400).json({message: "Вы уже подписаны"})

                                eventsFromBd.subscribers.push({
                                        user: req.user.id
                                })
                                await eventsFromBd.save()
        
                                return res.status(200).json({
                                        message: 'Пользователь подписан',
                                        eventsFromBd
                                })
                        }
                        else {
                                return res.status(400).json({message: "Некорректный запрос"})
                        }
                } catch(e) {
                        console.log(e)
                        return res.status(400).json({message: "Ошибка при подписки мероприятия"})
                }
        }

        async setPersense(req, res) {
                try {
                        if (!req.query || !req.query.link)
                                return res.status(400).json({message: "Некорректный запрос"})
                        
                        let eventsFromBd = await Event.findOne({presenseLink: req.query.link})

                        if (eventsFromBd) {
                                for (let i = 0; i < eventsFromBd.subscribers.length; i++) {
                                        if(eventsFromBd.subscribers[i]['user']) {
                                                if (eventsFromBd.subscribers[i]['user'].toString()===req.user.id) {
                                                        eventsFromBd.subscribers[i].presense = true

                                                        const user = await User.findById({_id: req.user.id})
                                                        user.takePart++
                                                        user.events.push(eventsFromBd._id)

                                                        await user.save()
                                                        await eventsFromBd.save()

                                                        return res.status(200).json({message: "Вас отметили"})
                                                }
                                        }
                                }
                                return res.status(400).json({message: "Вы не были подписаны на это мероприятие"}) 
                        } else {
                                return res.status(400).json({message: "Мероприятие с такой ссылкой не найдено"})
                        }
                        
                                        
                                                        
                } catch (e) {
                        console.log(e)
                        return res.status(400).json({message: "Ошибка при подписки мероприятия"})
                }
        }

        async addHours (req, res) {
                try {

                        const { hours, id } = req.body
                        if (hours<0 || hours>20) 
                                return res.status(400).json({message: "Недопустимое количество часов"})

                        if (!id) 
                                return res.status(400).json({message: "Некорректный запрос"})

                        if (req.params.id) {
                                let eventsFromBd = await Event.findOne({_id:req.params.id})
                                if (eventsFromBd) {
                                        for (let i = 0; i < eventsFromBd.subscribers.length; i++) {
                                                if(eventsFromBd.subscribers[i].user) {
                                                        if (eventsFromBd.subscribers[i].user.toString()===id) {
                                                                const user = await User.findById({_id: id})

                                                                if (!eventsFromBd.subscribers[i].presense) {
                                                                        eventsFromBd.subscribers[i].presense = true
                                                                        user.takePart++
                                                                        user.events.push(eventsFromBd._id)
                                                                }
                                                                       // return res.status(400).json({message: "Пользователь ещё не отмечен"})
                                                                eventsFromBd.subscribers[i].hours = parseInt(hours)
                                                                user.hours+=parseInt(hours)

                                                                switch(eventsFromBd.difficulty) {
                                                                        case "medium":
                                                                                user.coins+=parseInt(hours)*2
                                                                                break;
                                                                        case "hard":
                                                                                user.coins+=parseInt(hours)*4
                                                                                break;
                                                                        case "other":
                                                                                user.coins+=parseInt(hours)*6
                                                                                break;
                                                                        default:
                                                                                user.coins+=parseInt(hours)
                                                                }

                                                                await user.save()
                                                                await eventsFromBd.save()

                                                                return res.status(200).json({message: "Часы добавлены"})
                                                        }
                                                        
                                                }
                                                
                                        }
                                        return res.status(400).json({message: "Такого пользователя нет"})
                                }

                                eventsFromBd.subscribers.push({
                                        user: req.user.id
                                })
                                await eventsFromBd.save()
        
                                return res.status(200).json({
                                        message: 'Пользователь подписан',
                                        eventsFromBd
                                })
                        }
                        else {
                                return res.status(400).json({message: "Некорректный запрос"})
                        }

                } catch (e) {
                        console.log(e)
                        return res.status(400).json({message: "Ошибка при добавлении часов"})
                }
        }
}

module.exports = new eventPanelController()