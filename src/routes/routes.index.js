//Routes
const { Router } = require('express')
const router = Router()

//*Route GET /
router.get('/', (req, res) => {
    res.render('routes/home')
})

router.get('/profile', (req, res) => {
    res.render('routes/profile', res.locals.user)
})

module.exports = router;
