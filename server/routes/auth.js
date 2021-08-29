const express = require('express');
const axios = require('axios');
const {API_URL} = require('../config/const');
const { isLoggedIn, getValidationError, getNoSuchResource, getSuccess, getFailure, verifyEmail, verifyPassword} = require('./middleware');
const { request, getAPI, postAPI, patchAPI, deleteAPI} = require('./request');

const router = express.Router();
axios.defaults.headers.origin = 'http://localhost:5001';

router.post('/join', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // const exUser = await axios.post(`${API_URL}/auth/join`, {email, password});
        // console.log(exUser);
        if(!verifyEmail(email)){
            return res.status(400).json(getFailure(`email expression error: ${email}`));
        }
        if(!verifyPassword(password)){
            return res.status(400).json(getFailure(`password expression error: ${password}`));
        }

        const userResult = await axios({
            method: 'POST',
            url: `${API_URL}/auth/join`, 
            headers: {'bodycheck-client-secret': process.env.CLIENT_SECRET},
            data: {email, password}
        });
        if(!userResult.data.success){
            return res.json(getFailure('email already exists'));
        }

        return res.status(201).json(getSuccess(userResult.data.data));
    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
});

router.get('/test', isLoggedIn, async (req, res, next) => {
    try {
        const {token, id} = req.user;
        return res.status(200).json({token, id});
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/test', async (req, res, next) => {
    try {
        return res.status(201).json({asdf: 'asdf'});
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
            const tokenResult = await axios({
                method: 'POST',
                url: `${API_URL}/auth/login`, 
                headers: {'bodycheck-client-secret': process.env.CLIENT_SECRET},
                data: {email, password}
            });
            if(!tokenResult.data.success){
                return res.json(tokenResult.data);
            }
            const {token, exp, refreshToken} = tokenResult.data.data;

            const userResult = await axios({
                method: 'GET',
                url: `${API_URL}/auth/me`,
                headers: {'bodycheck-access-token': token},
            });
            const user = userResult.data.data;
            res.cookie('bodycheck', {token, id:user.id, exp, refreshToken}, {
                httpOnly: true,
                sameSite: true,
                signed: true,
                secure: false
            });
            return res.status(204).json();
        } catch (error) {
            console.error(error);
            return next(error);
        }
    });

router.get('/logout', isLoggedIn, async (req, res, next) => {
    try {
        res.clearCookie('bodycheck');
        return res.status(204).json();
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/me', isLoggedIn, async (req, res, next) => {
    try {
        const {token} = req.user;
        const userResult = await axios({
            method: 'GET',
            url: `${API_URL}/auth/me`,
            headers: {'bodycheck-access-token': token},
        });

        return res.status(200).json(userResult.data);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;
