const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const schemaUser = require('../models/models.user')
const helpers = require('../lib/helpers')

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},  async (req, username, password, done) => {
    try {
        req.body.password = await helpers.encryptPassword(req.body.password)
        const newUser = new schemaUser(req.body)
        await newUser.save()
        done(null, newUser)
    } catch (error) {
        return done(error, false)
    }
}))

passport.serializeUser(function(user, done) {
    done(null, user._id);
})

passport.deserializeUser(function(id, done) {
    schemaUser.findById(id, function(err, user) {
        done(null, user);
    })
})

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, username, password, done) => {
    try {
        const user = await schemaUser.findOne({email: username})
        if (!user) {
            return done(null, false, req.flash('message', 'user is not found'))
        }
        const validPassword = await helpers.matchPassword(password, user.password)
        if (!validPassword) {
            return done(null, false , req.flash('message', 'pasword is incorrect'))
        }
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))