const Router = require("express")
const User = require("../models/User")
const {check, validationResult} = require("express-validator")

const authMiddleware = require("../middleware/auth.middleware")
const uploadMiddleware = require("../middleware/upload.middleware")
const Event = require("../models/Event")
const router = new Router()

router.get('/', authMiddleware, async(req, res) => {

    const userInfoFromDB = await User.findById(req.user.id).populate('events', {title: 1, description: 1, location: 1, startDate: 1, img: 1})
    //.populate('events')

    const userInfo = {
        id: userInfoFromDB._id,
        email: userInfoFromDB.email,
        firstName: userInfoFromDB.firstName,
        lastName: userInfoFromDB.lastName,
        age: userInfoFromDB.age,
        registeredDate: userInfoFromDB.registeredDate,
        avatar: userInfoFromDB.avatar,
        hours: userInfoFromDB.hours,
        takePart: userInfoFromDB.takePart,
        events: userInfoFromDB.events,
        phoneNumber: userInfoFromDB.phoneNumber,
        coins: userInfoFromDB.coins,
        reputation: userInfoFromDB.reputation
    }

    return res.status(200).json(userInfo)
})

router.post('/avatar', authMiddleware, uploadMiddleware.single('file'), async (req, res) => {

    try {
        const userInfoFromDB = await User.findById(req.user.id)
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: 'Ошибка при загрузке фото'})
    }
    userInfoFromDB.avatar = req.file ? "http://hack.mysecrets.site/api/" + req.file.path.replace('uploads/','') : '',

    await userInfoFromDB.save()
    return res.status(200).json({message: 'аватар изменен'})
})

router.post('/', authMiddleware,
    [
        check('birthday', "Required a date").isISO8601().toDate(),
        check('phoneNumber', "Phone number not correct").isNumeric({min:11,max:11})
    ], async(req, res) => {

    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }

        const userInfoFromDB = await User.findById(req.user.id)

        userInfoFromDB.birthday = req.body.birthday
        userInfoFromDB.phoneNumber = req.body.phoneNumber

        await userInfoFromDB.save()

        return res.status(200).json({message: 'данные изменены'})
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: 'Ошибка'})
    }


})

router.get('/check', authMiddleware, async (req, res) => {
    const user = await User.findOne({_id:req.user.id})
    if (!user)
        return res.status(404).json({message: "User not found"})

    return res.status(200).json({

        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar
        }
    })
})

router.get('/:id', authMiddleware, async (req, res) => {
    if(!req.params.id)
        return res.status(400).json({message: "Non correct request"})

    const user = await User.findOne({_id:req.params.id})
    if (!user)
        return res.status(404).json({message: "User not found"})

    return res.status(200).json({
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            age: user.age,
            registeredDate: user.registeredDate,
            hours: user.hours,
            events: user.events,
        }
    })
})

router.get('/events/:id', authMiddleware, async (req, res) => {
    try {
        if(!req.params.id)
            return res.status(400).json({message: "Non correct request"})

        const user = await User.findOne({_id:req.params.id})
        if (!user)
            return res.status(404).json({message: "User not found"})

        const events = Event.find({user: {_id: req.params.id}}).exec (function (err, eve) {
            return res.status(200).json({
                createdEvents: eve
            })
        });
    } catch(e) {
        console.log(e)
        return res.status(400).json({message: 'Ошибка'})
    }
    
})

router.get('/add/hours', authMiddleware, async (req, res) => {
    try {
        if(!req.query.id || !req.query.count)
            return res.status(400).json({message: "Non correct request"})

        const user = await User.findOne({_id:req.params.id})
        if (!user)
            return res.status(404).json({message: "User not found"})

        const events = Event.find({user: {_id: req.params.id}}).exec (function (err, eve) {
            return res.status(200).json({
                createdEvents: eve
            })
        });
    } catch(e) {
        console.log(e)
        return res.status(400).json({message: 'Ошибка'})
    }
    
})

module.exports = router