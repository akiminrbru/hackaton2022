const {Schema, model, ObjectId} = require("mongoose");

const User = new Schema({
    email: {type: String, required:true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    registeredDate: {type: Date, default: Date.now()},
    reputation: {type: Number, default: 0},
    avatar: {type: String},
    birthday: {type: Date},
    hours: {type: Number, default: 0},
    coins: {type: Number, default: 0},
    takePart: {type: Number, default: 0}, // Участвовал в мероприятиях (кол-во)
    createdEventsN: {type: Number, default: 0},
    events: [{type: ObjectId, ref:'Event'}],
    phoneNumber: {type: Number, default: 0},
    createdEvents: [{type: ObjectId, ref:'Event'}]
})

module.exports = model('User', User)