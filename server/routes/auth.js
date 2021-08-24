const express = require('express');
const axios = require('axios');
const API_URL = require('../config/const');
const { isLoggedIn, getValidationError, getNoSuchResource, getSuccess, getFailure } = require('./middlewares');

const router = express.Router();

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

            const tokenResult = await axios.post(`${API_URL}/login`, {email, password});
            req.session.jwt = tokenResult.data.token;

            console.log(req.session.jwt);
            return res.status(200).json(req.session.jwt);
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
