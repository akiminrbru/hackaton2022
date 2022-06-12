const Event = require("../models/Event");

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

const searchTypes = {
    base: "base",
    all: "all",
    tags: "tags",
    tasks: "tasks"
}

class eventController {
    async getAll (req, res) {
        try {
            const eventsFromBd = await Event.find({}, {presenseLink: 0})

            return res.status(201).json(eventsFromBd)
        } catch (e) {
            //console.log(e)
            return res.status(400).json({message: "Ошибка при получении мероприятия"})
        }
    }

    async getOne (req, res) {
        try {
            if (req.params.id) {
                const eventsFromBd = await Event.findOne({_id:req.params.id})
                eventsFromBd.views++
                await eventsFromBd.save()

                if (eventsFromBd.user.toString()===req.user.id)
                    return res.status(201).json({info: eventsFromBd, user_id: req.user.id, isCreator: true})
                
                return res.status(201).json({info: eventsFromBd, user_id: req.user.id, isCreator: false})
            }
            else {
                return res.status(400).json({message: "Ошибка при получении полного мероприятия"})
            }

            
        } catch (e) {
            //console.log(e)
            return res.status(400).json({message: "Ошибка при получении мероприятия"})
        }
    }

    async del(req, res) {
        try {
            await Event.deleteMany({})
        } catch (e) {

        }
    }

    async delete(req, res) {
        try {
        
            let eventsFromBd
            if (req.params.id) {
                eventsFromBd = await Event.deleteOne({_id:req.params.id})
                return res.status(201).json({message: "Мероприятие удалено"})    
            }
            else {
                return res.status(400).json({message: "Некорректный id"})
            }
    
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Ошибка при удалении мероприятия"})
        }
    }

    async search(req,res) {
        try {
            const {text, type} = req.query

            if (!text)
                return res.status(400).json({message: "Некорректный текст"})

//escapeRegex(req.query.text)
            const regex = new RegExp(req.query.text, 'gi');
            let searchExpression = [
                {title: regex}, 
                {description: regex}
            ]

            if (type) {
                switch (type) {
                    case searchTypes.base:
                        searchExpression = [
                            {title: regex}, 
                            {description: regex},
                            {location: regex}
                        ]
                        break;

                    case searchTypes.all:

                        break;

                    case searchTypes.tags:
                        searchExpression = [
                            {tags: regex},
                            {workType: regex}
                        ]
                        break;

                    case searchTypes.tasks:
                        searchExpression = [
                            {tasks: regex},
                            {requirements: regex}
                        ]
                        break;
                }
            }

            await Event.find({$or: searchExpression}).exec ( function(err, events) {
                if(err){
                    console.log(err);
                    return res.status(400).send(err);
                } else {
                    if(events.length < 1) {
                        return res.status(200).json({message: "ничего не найдено"})
                    }
                    return res.status(200).send(events);
                }
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Ошибка при поиске мероприятия"})
        }
    }

    async sort(req,res) {
        try {
            const {sort} = req.query
            let events = await Event.find({})

            switch(events) {
                case "title":
                    events.sort({title: 1})
                    break;
                case "created":
                    events.sort({created: 1})
                    break;
                default:
                    return res.status(400).json({message: "Не удалось выполнить сортировку"})
            }

        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Ошибка при поиске мероприятия"})
        }
    }
}

module.exports = new eventController()