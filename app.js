const express = require('express')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const educationalProgramRoutes = require('./routes/educational_program')
const workingProgramRoutes = require('./routes/working_program')
const practiceRoutes = require('./routes/practice')
const theoryRoutes = require('./routes/theory')
const documentRoutes = require('./routes/document')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const cors = require('cors')
const app = express()


mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(()=>console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/educational_program', educationalProgramRoutes)
app.use('/api/working_program', workingProgramRoutes)
app.use('/api/practice', practiceRoutes)
app.use('/api/theory', theoryRoutes)
app.use('/api/document', documentRoutes)
app.use('/api/user', userRoutes)

module.exports = app


