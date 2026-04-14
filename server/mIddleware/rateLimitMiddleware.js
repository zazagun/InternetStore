const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 300, 
    message: 'Слишком много запросов с этого IP адреса, попробуйте позже',
    standardHeaders: true, 
    legacyHeaders: false, 
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: 'Слишком много попыток входа/регистрации. Попробуйте позже',
    skipSuccessfulRequests: true,
    standardHeaders: true,
    legacyHeaders: false,
})

const createLimiter = rateLimit({
    windowMs: 900000, 
    max: 30, 
    message: 'Слишком много попыток создания. Попробуйте позже',
    standardHeaders: true,
    legacyHeaders: false,
})

const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 3,
    message: 'Слишком много попыток. Попробуйте позже',
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = {
    generalLimiter,
    authLimiter,
    createLimiter,
    strictLimiter
}
