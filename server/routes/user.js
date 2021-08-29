const express = require('express');
const axios = require('axios');
const { isLoggedIn, getSuccess, getFailure, verifyPassword } = require('./middleware');
const { API_URL } = require('../config/const');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        // query options : paranoid, email
        // if (paranoid) return {User with {deletedAt} include deleted records}

        let { paranoid, email } = req.query;

        if (!email) {
            return res.json(getFailure('email is required in query'));
        }

        if (paranoid) {
            if (paranoid === 'true' || paranoid === '1') {
                paranoid = true;
            } else if (paranoid === 'false' || paranoid === '0') {
                paranoid = false;
            }
        }
        console.log(paranoid, email);
        const userResult = await axios.get(`${API_URL}/users`, { params: { paranoid, email } });

        return res.status(200).json(getSuccess(userResult.data));
    } catch (err) {
        console.error(err);
        next(err);
    }
})

// 로그인 상태에서 비번 변경
router.patch('/me', async (req, res, next) => {
    try {
        const { password } = req.body;
        const {id, token} = req.user;

        if (!password) {
            return res.status(400).json(getFailure('password is required in body'));
        }
        if (!verifyPassword(password)) {
            return res.status(400).json(getFailure(`password expression error: ${password}`));
        }

        const userResult = await axios({
            method: 'PATCH',
            url: `${API_URL}/users/${id}`,
            headers: { 'bodycheck-access-token': token },
            data: { password },
        });

        return res.status(userResult.status).json(userResult.data);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// 비로그인 상태에서 비번 변경
router.patch('/:id', async (req, res, next) => {
    try {
        const { password } = req.body;
        const {id} = req.params;

        if (!password) {
            return res.status(400).json(getFailure('password is required in body'));
        }
        if (!verifyPassword(password)) {
            return res.status(400).json(getFailure(`password expression error: ${password}`));
        }

        const userResult = await axios({
            method: 'PATCH',
            url: `${API_URL}/users/${id}`,
            headers: { 'bodycheck-client-secret': process.env.CLIENT_SECRET },
            data: { password },
        });

        return res.status(userResult.status).json(userResult.data);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});



module.exports = router;