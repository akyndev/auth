require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const AuthRouter = require('./router/user')


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/v1', AuthRouter)


mongoose.connect(process.env.MONGO_URI,{ useUnifiedTopology: true, useNewUrlParser: true })
.then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
.catch((error) => console.log(error))
