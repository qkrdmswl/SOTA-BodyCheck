const express = require('express');
const { isLoggedIn, getSuccess, getFailure, getValidationError, getTrueFalse } = require('./middleware');
const { request, getAPI, postAPI, patchAPI, deleteAPI} = require('./request');
const { axios } = require('axios');
const { API_URL } = require('../config/const');
const router = express.Router();



router.post('/me', isLoggedIn, async (req, res, next) => {
    try {
        // 로그인 유저의 운동에 대한 변수를 생성
        // body: {name, type}
        const { name, type, ExerciseId } = req.body;
        const token = req.user.token;
        const UserId = req.user.id;

        const exerciseGetResult = await getAPI(`/exercises/${ExerciseId}`, token).catch((err) => {
            return res.status(err.response.status).json(err.response.data);
        })
        if(UserId != exerciseGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + "can't create other's"));
        }

        const variablePostResult = await postAPI(`/variables`, token, {name, VariableTypeId: type, ExerciseId}).catch((err) => {
            return res.status(err.response.status).json(err.response.data);
        })


        return res.status(201).json(variablePostResult.data);

    } catch (err) {
        console.error(err);
        next(err);
    }
})
        
router.patch('/:id', isLoggedIn, async (req, res, next) => {
    try {
        // 기본의 변수가 레코드를 가지지 않으면 그냥 수정
        // 변수 수정 시 실제로는 기존 변수 삭제 후 새로운 변수를 연결.

        const {id} = req.params;
        const {token} = req.user;

        const variableGetResult = await getAPI(`/variables/${id}`, token);
        

        const variableDeleteResult = await deleteAPI(`/variables/${id}`, token);

        const deleteResult = await axios({
            method: 'DELETE',
            url: `${API_URL}/variables/${id}`
        })

        

        return res.status().json()
        
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