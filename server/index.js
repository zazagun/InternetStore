// стек //
// node js
// cors для натсройки API
// Express Js
// Sequelize ORM для реляц. бд на js
// JWT токен

require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./router/index')
const errorHandler = require('./middleware/errorMiddleware')
const { generalLimiter } = require('./middleware/rateLimitMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const corsOptions = {
    origin: 'http://localhost:3000' || 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 
}

const app = express()

app.use(cors(corsOptions))

app.use((req, res, next) => {
    // X-Content-Type-Options предотвращает MIME-sniffing атаки
    res.setHeader('X-Content-Type-Options', 'nosniff')
    
    // X-Frame-Options защищает от clickjacking
    res.setHeader('X-Frame-Options', 'DENY')
    
    // X-XSS-Protection включает встроенную XSS защиту браузера
    res.setHeader('X-XSS-Protection', '1; mode=block')
    
    // Strict-Transport-Security (если используешь HTTPS)
    if (process.env.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    }
    
    next()
})

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use('/api', generalLimiter, router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()