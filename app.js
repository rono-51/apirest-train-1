//*Dotenv
require('dotenv').config();

//*Require Node Modules
const express = require('express')
const logger = require('morgan')
const { create } = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoDbStore = require('express-mongodb-session')(session)
const flash = require('connect-flash')
require('./src/passport/passport')

//*Require my modules
const connectDb = require('./src/db/database')
const routesHero = require('./src/routes/routes.index')
const authRoute = require('./src/routes/auth')

//*Initialize Express
const app = express()

//*Set views in app
app.set('views', path.join(__dirname, 'src/views'))

//*Set public folder
app.use(express.static(path.join(__dirname, 'src/public')))

//*Express-handlebars config
const hbs = create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: app.get('views') + '/partials',
    helpers:  require('./src/lib/helpers.handlebars'),
    extname: '.hbs',
})
app.set('view engine', '.hbs')
app.engine('.hbs', hbs.engine)

//*App Config
app.use(cookieParser(process.env.SECRET_KEY))
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    },
    store: new MongoDbStore({
        uri: process.env.DATABASE_URI,
        collection: 'sessions-mongoDbApp'
    })
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//*Global variables
app.use((req, res, next) => {
    res.locals.message = req.flash('message')
    res.locals.user = req.user
    next()
})

//*App Routes
app.use(routesHero)
app.use(authRoute)

//*App listen
app.listen(process.env.APP_PORT || 3000, async () => {
    connectDb();
    console.log('Server is running on port ' + process.env.APP_PORT);
})