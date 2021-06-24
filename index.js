const express = require('express')
const config = require('./config/config.json')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()


app.use(express.static("public"))
app.use(express.json({ limit: "50mb" }))
app.use(cors())

app.use(express.json({extended: true}))

//авторизация
app.use('/api/auth', require('./routes/auth.routes'))
//слайдер
app.use('/api/slider', require('./routes/slider.routes'))


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.NODE_ENV === 'production' ? config.prodPort : config.port


async function start() {
    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error: ', e.message)
        process.exit(1)
    }
}

start()

