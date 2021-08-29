const express = require('express');
const axios = require('axios');
const { isLoggedIn, getSuccess, getFailure, getValidationError } = require('./middleware');
const { request, getAPI, postAPI, patchAPI, deleteAPI} = require('./request');
const { API_URL } = require('../config/const');
const router = express.Router();

router.post('/me', isLoggedIn, async (req, res, next) => {
    try {
        // body: {name, variables}
        const { token, id } = req.user;
        const { name, variables } = req.body;

        const exerciseResult = await postAPI('/exercises', token, {UserId: id, name});
        const exercise = exerciseResult.data.data;

        let createdVars = new Array();
        if(variables !== undefined){
            exerciseResult.data.data.variables = new Array();
            for(let i = 0; i < variables.length; i++){
                createdVars[i] = await postAPI('/variables', token, {
                    ExerciseId: exercise.id, 
                    name: variables[i].name,
                    VariableTypeId: variables[i].type,
                })
                .catch(async(err) => {
                    for(let j = 0; j < i; j++){
                        await deleteAPI(`/variables/${createdVars[j].data.data.id}`, token, {force: true})
                    }
                    await deleteAPI(`/exercises/${exercise.id}`, token, {force:true});
                    return res.status(err.response.status).json(err.response.data);
                })
                exerciseResult.data.data.variables[i] = createdVars[i].data.data;
            }
        }

        return res.status(201).json(exerciseResult.data);

    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
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
            params: { UserId: id }
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

// 로그인 유저 본인의 운동 수정, 해당 id의 운동이 로그인 유저의 것이 아닐 경우 에러
router.patch('/:id/me', isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const { token } = req.user;
        const UserId = req.user.id;

        if (!name) {
            return res.status(400).json(getFailure('Name is required'))
        }
        
        const getResult = await axios({
            method: 'GET',
            url: `${API_URL}/exercises/${id}`,
            headers: { 'bodycheck-access-token': token },
        }).catch((err) => {
            const status = err.response.status;
            if(status === 400 || status === 404){
                return res.status(status).json(err.response.data);
            }
        });

        if(UserId != getResult.data.data.UserId){
            console.log(UserId, getResult.data.data.UserId);
            return res.status(400).json(getFailure('u can update only ur exercise'));
        }

        const exerciseResult = await axios({
            method: 'PATCH',
            url: `${API_URL}/exercises/${id}`,
            headers: { 'bodycheck-access-token': token },
            data: { name },
        }).catch((err) => {
            const status = err.response.status;
            if(status === 400 || status === 404){
                return res.status(status).json(err.response.data);
            }
        });


        return res.status(exerciseResult.status).json(exerciseResult.data);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.delete('/:id/me', isLoggedIn, async (req, res, next) => {
    try {
        // Exercise를 delete하더라도 Record는 유지한다.
        // 유지되는 Record의 type을 해석하기 위해 Variable 또한 유지한다.
        // 로그인 유저의 운동만 삭제 가능.

        const { id } = req.params;
        const { force } = req.query;
        const { token } = req.user;
        const UserId = req.user.id;

        const getResult = await getAPI(`/exercises/${id}`, token, {paranoid: !force}).catch((err) => {
            return res.status(err.response.status).json(err.response.data);
        })

        if(UserId != getResult.data.data.UserId){
            return res.status(400).json(getFailure('u can delete only ur exercise'));
        }

        const exerciseResult = await deleteAPI(`/exercises/${id}`, token, {force}).catch((err) => {
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