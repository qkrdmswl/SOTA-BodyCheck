const express = require('express');
const axios = require('axios');
const { isLoggedIn, getSuccess, getFailure, getValidationError } = require('./middleware');
const {  getAPI, postAPI, patchAPI, deleteAPI} = require('./request');
const { API_URL } = require('../config/const');
const router = express.Router();

router.post('/me', isLoggedIn, async (req, res, next) => {
    try {
        // body: {name, variables}
        const { token, id } = req.user;
        const { name, variables } = req.body;

        const exercisePostResult = await postAPI('/exercises', token, {UserId: id, name});
        const exercise = exercisePostResult.data.data;

        let createdVars = new Array();
        if(variables !== undefined){
            exercisePostResult.data.data.variables = new Array();
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
                exercisePostResult.data.data.variables[i] = createdVars[i].data.data;
            }
        }

        return res.status(201).json(exercisePostResult.data);

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
        const {paranoid, withVariables, withRecords} = req.query;
        const exerciseGetResult = await getAPI('/exercises', token, {UserId: id, paranoid, withVariables, withRecords});

        return res.status(exerciseGetResult.status).json(exerciseGetResult.data);

    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

router.put('/:id/me', isLoggedIn, async (req, res, next) => {
    try {
        const {name, variables} = req.body;
        const { token} = req.user;
        const UserId = req.user.id;
        const {id} = req.params;
        
        const exerciseGetResult = await getAPI(`/exercises/${id}`, token, {withVariables: true});
        if(UserId != exerciseGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur exercise'));
        }

        // delete
        const exercise = exerciseGetResult.data.data;
        console.log(exercise);
        const variablesGetResult = await getAPI(`/variables`, token, {ExerciseId: exercise.id});
        const exVariables = variablesGetResult.data.data;
        for(let i = 0; i < exVariables.length; i++){
            await deleteAPI(`/variables/${exVariables[i].id}`, token);
        }
        await deleteAPI(`/exercises/${exercise.id}`, token);

        // post
        const exercisePostResult = await postAPI('/exercises', token, {UserId, name});
        const newExercise = exercisePostResult.data.data;
        let createdVars = new Array();
        if(variables !== undefined){
            exercisePostResult.data.data.variables = new Array();
            for(let i = 0; i < variables.length; i++){
                createdVars[i] = await postAPI('/variables', token, {
                    ExerciseId: newExercise.id, 
                    name: variables[i].name,
                    VariableTypeId: variables[i].type,
                })
                .catch(async(err) => {
                    for(let j = 0; j < i; j++){
                        await deleteAPI(`/variables/${createdVars[j].data.data.id}`, token, {force: true})
                    }
                    await deleteAPI(`/exercises/${newExercise.id}`, token, {force:true});
                    return res.status(err.response.status).json(err.response.data);
                })
                exercisePostResult.data.data.variables[i] = createdVars[i].data.data;
            }
        }

        return res.status(201).json(exercisePostResult.data);
        

    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
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
        
        const exerciseGetResult = await getAPI(`/exercises${id}`, token);

        if(UserId != exerciseGetResult.data.data.UserId){
            return res.status(400).json(getFailure('u can update only ur exercise'));
        }

        const exercisePatchResult = await patchAPI(`/exercises${id}`, token, {name});


        return res.status(exercisePatchResult.status).json(exercisePatchResult.data);
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
        // 삭제할 운동의 기록이 있으면 일반삭제
        // 그렇지 않으면 완전삭제

        const { id } = req.params;
        const { token } = req.user;
        const UserId = req.user.id;

        // id 검사
        const exerciseGetResult = await getAPI(`/exercises/${id}`, token);
        // /me 검사
        if(UserId != exerciseGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + 'u can delete only ur exercise'));
        }

        // record 검사
        let exist = false;
        const variableGetResult = await getAPI('/variables', token, {ExerciseId: id});
        if(variableGetResult.status != 204){
            const variables = variableGetResult.data.data;
            for(let i = 0; i < variables.length; i++){
                const recordGetResult = await getAPI('/records', token, {VariableId: variables[i].id});
                if(recordGetResult.status != 204){
                    exist = true;
                    break;
                }
            }
            for(let i = 0; i < variables.length; i++){
                await deleteAPI(`/variables/${variables[i].id}`, token, {force: !exist});
            }
        }

        await deleteAPI(`/exercises/${id}`, token, {force: !exist});

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