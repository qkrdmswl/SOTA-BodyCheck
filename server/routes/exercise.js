const express = require('express');
const axios = require('axios');
const { isLoggedIn, getSuccess, getFailure, getValidationError } = require('./middleware');
const { API_URL } = require('../config/const');
const router = express.Router();

router.post('/me', isLoggedIn, async (req, res, next) => {
    try {
        const { token, id } = req.user;
        const { name } = req.body;
        // body: {name}

        const exerciseResult = await axios({
            method: 'POST',
            url: `${API_URL}/exercises`,
            headers: { 'bodycheck-access-token': token },
            data: { UserId: id, name },
        });
        return res.status(201).json(exerciseResult.data);

    } catch (err) {
        const status = err.response.status;
        if (status === 404 || status === 400) {
            return res.status(status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

router.get('/me', isLoggedIn, async (req, res, next) => {
    try {
        const { token, id } = req.user;
        const exerciseResult = await axios({
            method: 'GET',
            url: `${API_URL}/exercises`,
            headers: { 'bodycheck-access-token': token },
            data: { UserId: id }
        });

        return res.status(exerciseResult.status).json(exerciseResult.data);

    } catch (err) {
        const status = err.response.status;
        if (status === 404 || status === 400) {
            return res.status(status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})


router.patch('/:id', isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json(getFailure('Name is required'))
        }
    
        // await exercise.update({ name });

        const exerciseResult = await axios({
            method: 'PATCH',
            url: `${API_URL}/exercise/${id}`,
            headers: { 'bodycheck-access-token': token },
            data: { name },
        });


        return res.status(exerciseResult.status).json(exerciseResult.data);
    } catch (err) {
        const status = err.response.status;
        if(status === 400 || status === 404){
            return res.status(status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        // Exercise를 delete하더라도 Record는 유지한다.
        // 유지되는 Record의 type을 해석하기 위해 Variable 또한 유지한다.
        const { id } = req.params;
        const { force } = req.query;
        const { token } = req.user;

        const exerciseResult = await axios({
            method: 'DELETE',
            url: `${API_URL}/exercises/${id}`,
            headers: { 'bodycheck-access-token': token },
            params: {
                force,
            }
        }).catch((err) => {
            const status = err.response.status;
            if(status){
                return res.status(status).json(err.response.data);
            }
        });

        return res.status(204).json();
    } catch (err) {
        
        console.error(err);
        next(err);
    }
})


module.exports = router;