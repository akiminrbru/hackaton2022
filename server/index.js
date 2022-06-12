const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const corsMiddleware = require("./middleware/cors.middleware")

const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")
const eventRouter = require("./routes/events.routes")

const app = express()
const PORT = config.get("serverPort")

app.use(corsMiddleware)
app.use(express.json())
app.use('/api',express.static('uploads'))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/event", eventRouter)

const start = async () => {
    try {

        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser: true,
        })
            .then(() => console.log('MongoDB connected'))
            .catch(error => console.log(error));


        app.listen(PORT, ()=> {
            console.log("start", PORT)
        })
    } catch (e) {

    }
}

start()
