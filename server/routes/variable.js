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

        const exerciseGetResult = await getAPI(`/exercises/${ExerciseId}`, token);

        if(UserId != exerciseGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + "can't create other's"));
        }

        const variablePostResult = await postAPI(`/variables`, token, {name, VariableTypeId: type, ExerciseId});

        return res.status(201).json(variablePostResult.data);

    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

router.get('/me', isLoggedIn, async (req, res, next) => {
    try{
        const {ExerciseId} = req.query;
        const token = req.user.token;
        const UserId = req.user.id;

        const exerciseGetResult = await getAPI(`/exercises/${ExerciseId}`, token);
        if(UserId != exerciseGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur exercise'));
        }

        const variableGetResult = await getAPI(`/variables`, token, {ExerciseId});
        return res.status(variableGetResult.status).json(variableGetResult.data);
    }catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})
        
router.patch('/:id/me', isLoggedIn, async (req, res, next) => {
    try {
        // 기본의 변수가 레코드를 가지지 않으면 그냥 수정
        // 아니면 exercse, variable 삭제 후 새로 생성
        // body options: name, type

        const {id} = req.params;
        const {token} = req.user;
        const UserId = req.user.id;
        const {name} = req.body;
        let force = false;

        if(!name && !type){
            return res.status(400).json(getFailure(req.originalUrl));
        }

        // id 검사
        const variableGetResult = await getAPI(`/variables/${id}`, token);
        
        // /me 검사
        const exerciseGetResult = await getAPI(`/exercises/${variableGetResult.data.data.ExerciseId}`, token);
        if(UserId != exerciseGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur variable'));
        }

        const variablePatchResult = await patchAPI(`/variables/${id}`, token, {name});
        return res.status(variablePatchResult.status).json(variablePatchResult.data);

        
    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

router.delete('/:id/me', isLoggedIn, async (req, res, next) => {
    try {
        // variable의 recorde가 존재하면 삭제
        // 존재하지 않으면 완전삭제
        const { id } = req.params;
        const { token } = req.user;
        const UserId = req.user.id;

        // id 검사
        const variableGetResult = await getAPI(`/variables/${id}`, token);
        // /me 검사
        const exerciseGetResult = await getAPI('/exercises', token, {UserId});
        const exercises = exerciseGetResult.data.data;
        let exist = false;
        for(let i = 0; i < exercises.length; i++){
            if(exercises[i].id == variableGetResult.data.data.ExerciseId){
                exist = true;
                break;
            }
        }
        if(!exist){
            return res.status(404).json(getFailure(req.originalUrl + ' not ur variable'));
        }

        // record 검사
        const recordGetResult = await getAPI(`/records`, token, {
            VariableId: variableGetResult.data.data.id,
        });

        let force = false;
        if(recordGetResult.status === 204){
            force = true;
        }

        await deleteAPI(`/variables/${id}`, token, {force});

        return res.status(204).json();
    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

module.exports = router;