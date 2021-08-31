const express = require("express");
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const cors = require('cors');

dotenv.config();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const variableRouter = require('./routes/variable');
const exerciseRouter = require('./routes/exercise');
const profileRouter = require('./routes/profile');
const recordRouter = require('./routes/record');
const dateRecordRouter = require('./routes/dateRecord');
const dietRouter = require('./routes/diet');
const uploadRouter = require('./routes/upload');


const app = express();
app.set('port', process.env.PORT || 3001);
app.use(cors());
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.static(path.join(__dirname, '../build')));

app.use(cookieParser(process.env.COOKIE_SECRET));
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
app.use('/user', userRouter);
app.use('/variable', variableRouter);
app.use('/exercise', exerciseRouter);
app.use('/profile', profileRouter);
app.use('/record', recordRouter);
app.use('/dateRecord', dateRecordRouter);
app.use('/diet', dietRouter);
app.use('/upload', uploadRouter);

// app.get('*', async (req, res) => {
//     res.sendFile(path.join(__dirname, '/../build/index.html'));
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 활성화');
});