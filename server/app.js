const express = require("express");
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
const authRouter = require('./routes/auth');


const app = express();
app.set('port', process.env.PORT || 5001);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use('/auth', authRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 활성화');
});