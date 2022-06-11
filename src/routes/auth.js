const { Router } = require('express');
const router = Router();
const passport = require('passport');

//*AUTENTICACION ROUTES

router.get('/signup', (req, res) => {
    res.render('routes/signup')
})

router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))

router.get('/signin', (req, res) => {
    res.render('routes/signin')
})

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}))

module.exports = router;