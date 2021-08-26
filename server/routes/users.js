const express = require('express');
const axios = require('axios');
const { isLoggedIn, getSuccess, getFailure, verifyPassword } = require('./middlewares');
const {API_URL} = require('../config/const');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        // query options : paranoid, email
        // if (paranoid) return {User with {deletedAt} include deleted records}

        let {paranoid, email} = req.query;

        if(!email){
            return res.json(getFailure('email is required in query'));
        }

        if(paranoid){
            if(paranoid === 'true' || paranoid === '1'){
                paranoid = true;
            } else if (paranoid === 'false' || paranoid === '0'){
                paranoid = false;
            }
        }
        console.log(paranoid, email);
        const userResult = await axios.get(`${API_URL}/users`, {params: {paranoid, email}});

        return res.status(200).json(getSuccess(userResult.data));
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.get('/:id', isLoggedIn, async (req, res, next) => {
    try {
        // query options : paranoid
        // if (paranoid) return {User with {deletedAt} include deleted records}

        const {id} = req.params;
        let { paranoid } = req.query;
        if(paranoid){
            if(paranoid === 'true' || paranoid === '1'){
                paranoid = true;
            } else if (paranoid === 'false' || paranoid === '0'){
                paranoid = false;
            }
        }
        const user = await User.findOne({
            where: {id},
            attributes: {exclude:['password']},
            paranoid,
        });
        if(!user){
            return res.status(404).json(getFailure(req.originalUrl));
        }

        return res.status(200).json(getSuccess(user));

    } catch (err) {
        console.error(err);
        next(err);
    }
})


router.patch('/', isLoggedIn, async (req, res, next) => {
    try {
        const {id, token} = req.user;
        const {password} = req.body;

        if(!password){
            return res.status(400).json(getFailure('password is required in body'));
        }
        if(!verifyPassword(password)){
            return res.status(400).json(getFailure(`password expression error: ${password}`));
        }

        const userResult = await axios({
            method: 'PATCH',
            url: `${API_URL}/users/${id}`,
            headers: {'bodycheck-access-token': token},
            data: {password},
        });

        return res.status(userResult.status).json(userResult.data);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});


router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const user = await User.findOne({ 
            where: { id },
            attributes: {exclude: ['password']},
        });
        if (!user) {
            return res.status(404).json(getFailure(req.originalUrl));
        }

        await user.destroy();

        return res.status(204).json();
    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;