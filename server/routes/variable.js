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
        // 변수 수정 시 실제로는 기존 변수 삭제 후 새로운 변수를 연결.
        // body options: name, type

        const {id} = req.params;
        const {token} = req.user;
        const UserId = req.user.id;
        const {name, type} = req.body;
        let force = false;

        if(!name && !type){
            return res.status(400).json(getFailure(req.originalUrl));
        }

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

        // record 검사. 하나라도 있으면 삭제 후 재생성, 하나도 없으면 수정.
        const recordGetResult = await getAPI(`/records`, token, {
            VariableId: variableGetResult.data.data.id,
        });

        let result;
        if(recordGetResult.status === 204){
            result = await patchAPI(`/variables/${id}`, token, {name, VariableTypeId: type});
        } else {
            await deleteAPI(`/variables/${id}`, token, {force});
            const newData = {
                name: name ? name : variableGetResult.data.data.name,
                ExerciseId: variableGetResult.data.data.ExerciseId,
                VariableTypeId: type ? type : variableGetResult.data.data.VariableTypeId,
            }
            result = await postAPI('/variables', token, newData);

        }
        return res.status(result.status).json(result.data);
        
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