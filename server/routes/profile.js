const express = require('express');
const axios = require('axios');
const { isLoggedIn, getSuccess, getFailure, verifyPassword } = require('./middleware');
const { API_URL } = require('../config/const');
const router = express.Router();


router.get('/me', isLoggedIn, async (req, res, next) => {
    try {
        const { token, id } = req.user;
        const profileResult = await axios({
            method: 'GET',
            url: `${API_URL}/userProfiles`,
            headers: { 'bodycheck-access-token': token },
            params: { UserId: id }
        });

        return res.status(profileResult.status).json(profileResult.data);
    } catch (err) {
        const status = err.response.status;
        if (status === 404 || status === 400) {
            return res.status(status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

router.post('/me', isLoggedIn, async (req, res, next) => {
    try {
        const { token, id } = req.user;
        const { nick, image, age, height, weight, text } = req.body;

        if (text) {
            if (text.length > 255) {
                return res.status(404).json(getFailure(' Text must be 255 or less'));
            }
        }

        const profileResult = await axios({
            method: 'POST',
            url: `${API_URL}/userProfiles`,
            headers: { 'bodycheck-access-token': token },
            data: { UserId: id, nick, image, age, height, weight, text },
        }).catch((err) => {
            const status = err.response.status;
            if (status === 404 || status === 400) {
                return res.status(status).json(err.response.data);
            }
            console.error(err);
            next(err);
        });

        return res.status(201).json(profileResult.data);

    } catch (err) {

        console.error(err);
        next(err);
    }
})


router.patch('/me', isLoggedIn, async (req, res, next) => {
    try {
        const { token, id } = req.user;
        const { nick, image, age, height, weight, text } = req.body;

        if (text) {
            if (text.length > 255) {
                return res.status(404).json(getFailure(' Text must be 255 or less'));
            }
        }

        if (nick === null){
            return res.status(400).json(getFailure('nick is not nullable'));
        }

        const profileResult = await axios({
            method: 'GET',
            url: `${API_URL}/userProfiles`,
            headers: { 'bodycheck-access-token': token },
            params: { UserId: id }
        });
        const profileId = profileResult.data.data.id;
        const updateResult = await axios({
            method: 'PATCH',
            url: `${API_URL}/userProfiles/${profileId}`,
            headers: { 'bodycheck-access-token': token },
            data: { nick, image, age, height, weight, text },
        }).catch((err) => {
            const status = err.response.status;
            if (status === 404 || status === 400) {
                return res.status(status).json(err.response.data);
            }
            console.error(err);
            next(err);
        });

        return res.status(updateResult.status).json(updateResult.data);

    } catch (err) {
        console.error(error);
        next(error);
    }
})

module.exports = router;