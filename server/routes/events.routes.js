const Router = require("express")
const Event = require("../models/Event")
const config = require("config")
const {check, validationResult} = require("express-validator")
const authMiddleware = require("../middleware/auth.middleware")
const uploadMiddleware = require("../middleware/upload.middleware")
const router = new Router()
const uuid = require('uuid')
const eventController = require("../controllers/eventController")
const eventPanelController = require("../controllers/eventPanelController")

const crypto = require('crypto')

router.post('/', authMiddleware, uploadMiddleware.single('file'), async(req, res) => {
    try {
        const {
            title, description, location, startDate, endDate, tags, difficulty, participateWays,
            company, vacancySphere, workType, vacancyName, requirements, tasks, deadlines, age, contactEmail,
            conditions, salary,
            awards, coins, services
        } = req.body

        const link = uuid.v4()
        //crypto.createHash("sha1").update("\xac", JSON.stringify({title, description})).digest("hex")
        const event = new Event({
            img: req.file ? "http://hack.mysecrets.site/api/" + req.file.path.replace('uploads/','') : '',
            title, description, location, startDate, endDate, tags, difficulty, participateWays,
            fullInfo: {
                company, vacancySphere, workType, vacancyName, requirements, tasks, deadlines, age, contactEmail
            },
            workInfo: {
                conditions, salary,
            },
            helperInfo: {
                awards, coins, services
            },
            user: req.user.id,
            presenseLink: link
        })

        await event.save()

        //const user = await User.findOne({_id:req.user.id})
        //user.createdEvents.push()

        return res.status(201).json({message: "Мероприятие создано"})

    } catch (e) {
        console.log(e)
        return res.status(400).json({message: "Ошибка при создании мероприятия"})
    }
})

router.delete('/:id', authMiddleware, eventController.delete)



//router.delete('/banana/', eventController.del)
router.get('/', eventController.getAll)
router.get('/search/text', eventController.search)
router.get('/sort', eventController.sort)
router.get('/panel/:id', authMiddleware, eventPanelController.getInfo)
router.post('/panel/hours/:id', authMiddleware, eventPanelController.addHours)
router.get('/subs/:id', authMiddleware, eventPanelController.subscribe)
router.get('/persense/params', authMiddleware, eventPanelController.setPersense)
router.get('/:id', authMiddleware, eventController.getOne)


module.exports = router