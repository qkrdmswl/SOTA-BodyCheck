const express = require('express');
const axios = require('axios');
const { isLoggedIn, getSuccess, getFailure, verifyPassword } = require('./middleware');
const { API_URL } = require('../config/const');
const { getAPI, postAPI, patchAPI } = require('./request');
const router = express.Router();


router.get('/me', isLoggedIn, async (req, res, next) => {
    try {
        const { token, id } = req.user;
        
        const profileResult = await getAPI('/userProfiles', token, {UserId: id});

        return res.status(profileResult.status).json(profileResult.data);
    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
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

        const profilePostResult = await postAPI('/userProfiles', token, {
            UserId: id, nick, image, age, height, weight, text,
        });

        return res.status(201).json(profilePostResult.data);

    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
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

        const profileGetResult = await getAPI('/userProfiles', token, {UserId: id});
        const profileId = profileGetResult.data.data.id;

        const profilePatchResult = await patchAPI(`/userProfiles/${profileId}`, token, {nick,image,age,height,weight,text});

        return res.status(profilePatchResult.status).json(profilePatchResult.data);

    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

module.exports = router;