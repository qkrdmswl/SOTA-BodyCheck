const express = require('express');
const { isLoggedIn, getSuccess, getFailure, getValidationError, getTrueFalse } = require('./middleware');
const { axios } = require('axios');
const { API_URL } = require('../config/const');
const router = express.Router();


        
router.patch('/:id', isLoggedIn, async (req, res, next) => {
    try {
        // 변수 수정 시 실제로는 기존 변수 삭제 후 새로운 변수를 연결.
        const {id} = req.params;
        const {token} = req.user;

        const deleteResult = await axios({
            method: 'DELETE',
            url: `${API_URL}/variables/${id}`
        })
        
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { force } = req.query;
        const { token } = req.user;

        const variableResult = await axios({
            method: 'DELETE',
            url: `${API_URL}/variables/${id}`,
            headers: { 'bodycheck-access-token': token },
            params: {
                force,
            }
        });

        return res.status(204).json();
    } catch (err) {
        const status = err.response.status;
        if(status){
            return res.status(status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

module.exports = router;