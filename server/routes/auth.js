const express = require('express');
const axios = require('axios');
const {API_URL} = require('../config/const');
const { isLoggedIn, getValidationError, getNoSuchResource, getSuccess, getFailure } = require('./middlewares');

const router = express.Router();
axios.defaults.headers.origin = 'http://localhost:5001';
router.post('/join', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.json(getFailure('alread exists'));
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            password: hash,
        });
        return res.status(201).json(getSuccess(exUser));
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/test', isLoggedIn, async (req, res, next) => {
    try {
        const {token, id} = req.user;
        return res.status(201).json({token, id});
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login',
    async (req, res, next) => {
        const { email, password } = req.body;
        const params = { email, password };
        const validationError = getValidationError(params);

        if (validationError) {
            return res.status(400).json(validationError);
        }
        else {
            next();
        }

    },
    async (req, res, next) => {
        try {

            const { email, password } = req.body;
            const tokenResult = await axios.post(`${API_URL}/auth/login`, {email, password});
            const token = tokenResult.data.data;
            const userResult = await axios({
                method: 'GET',
                url: `${API_URL}/auth/me`,
                headers: {'bodycheck-access-token': token},
            });
            const user = userResult.data.data;
            res.cookie('bodycheck', {token, id:user.id}, {
                httpOnly: true,
                sameSite: true,
                signed: true,
                secure: false
            });
            return res.status(200).json(token);
        } catch (error) {
            console.error(error);
            return next(error);
        }
    });

router.get('/test', isLoggedIn, async (req, res, next) => {
    try {
        const {token, id} = req.user;
        return res.status(201).json({token, id});
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/me', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.decoded.id } });
        if (!user) {
            return res.status(400).json(getNoSuchResource('user', `id=${req.decoded.id}`));
        }
        return res.status(200).json(getSuccess(user));
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/refresh', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.decoded.id } });
        if (!user) {
            return res.status(400).json(getFailure(`user ${req.decoded.email} does not exist`))
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: '1h',
            issuer: 'sota',
        });
        return res.status(200).json(getSuccess(token));
    } catch (error) {
        console.error(error);
        return next(error);
    }
});


module.exports = router;