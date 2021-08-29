const express = require('express');
const { isLoggedIn, getSuccess, getFailure, getValidationError, updateForEach } = require('./middleware');
const { postAPI, getAPI, patchAPI, deleteAPI } = require('./request');
const router = express.Router();

router.post('/me', isLoggedIn, async (req, res, next) => {
    try {
        const {record, set, DateRecordId, VariableId} = req.body;
        const UserId = req.user.id;
        const token = req.user.token;

        // DateRecordId 검사
        const dateRecordGetResult = await getAPI(`/dateRecords/${DateRecordId}`, token);
        // /me 검사
        if(UserId != dateRecordGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur record'));
        }

        // VariableId 검사
        const variableGetResult = await getAPI(`/variables/${VariableId}`, token);
        const exerciseGetResult = await getAPI(`/exercises/${variableGetResult.data.data.ExerciseId}`, token);
        if(UserId != exerciseGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur record'));
        }

        const recordPostResult = await postAPI('/records', token, {record, set, DateRecordId, VariableId});

        return res.status(recordPostResult.status).json(recordPostResult.data);
    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
});

router.get('/me', isLoggedIn, async (req, res, next) => { 
    try {
        // query options: date, VariableId, DateRecordId, set
        const token = req.user.token;
        const UserId = req.user.id;

        let {date, VariableId, DateRecordId, set} = req.query;
        let where = {};
        const dateReg = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;


        if(date){
            if(! dateReg.test(date)){
                return res.status(400).json(getFailure(req.originalUrl + ' date format error: yyyy-mm-dd'));
            }
            const dateRecordGetResult = await getAPI('/dateRecords', token, {UserId, date});
            DateRecordId = dateRecordGetResult.data.data.id;
        }

        const recordGetResult = await getAPI('/records', token, {VariableId, DateRecordId, set});

        return res.status(recordGetResult.status).json(recordGetResult.data);

    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})


router.get('/:id/me', isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        const token = req.user.token;
        const UserId = req.user.id;

        const recordGetResult = await getAPI(`/records/${id}`, token);
        const dateRecordGetResult = await getAPI(`/dateRecords/${recordGetResult.data.data.DateRecordId}`, token);
        if(UserId != dateRecordGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur record'));
        }

        return res.status(recordGetResult.status).json(recordGetResult.data);
    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

router.patch('/:id/me', isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { record, set } = req.body;
        const token = req.user.token;
        const UserId = req.user.id;

        const recordGetResult = await getAPI(`/records/${id}`, token);
        const dateRecordGetResult = await getAPI(`/dateRecords/${recordGetResult.data.data.DateRecordId}`, token);
        if(UserId != dateRecordGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur record'));
        }

        const recordPatchResult = await patchAPI(`/records/${id}`, token, {record, set});
        return res.status(recordPatchResult.status).json(recordPatchResult.data);

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
        // 부모 exercise가 일반삭제 상태고 더이상 레코드가 없으면 exercise, variable 완전삭제
        const { id } = req.params;
        const token = req.user.token;
        const UserId = req.user.id;
        
        const recordGetResult = await getAPI(`/records/${id}`, token);
        const dateRecordGetResult = await getAPI(`/dateRecords/${recordGetResult.data.data.DateRecordId}`, token);
        if(UserId != dateRecordGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur record'));
        }

        await deleteAPI(`/records/${id}`, token);

        const record = recordGetResult.data.data;
        const variableGetResult = await getAPI(`/variables/${record.VariableId}`, token, {paranoid:false});
        const variable = variableGetResult.data.data;
        const exerciseGetResult = await getAPI(`/exercises/${variable.ExerciseId}`, token, {paranoid:false});
        const exercise = exerciseGetResult.data.data;

        if(exercise.deletedAt != null){
            let exist = false;
            const variablesGetResult = await getAPI('/variables', token, {
                ExerciseId: exercise.id, 
                withRecords:true, 
                paranoid:false
            });
            if(variablesGetResult.status != 204){
                const variables = variablesGetResult.data.data;
                for(let i = 0; i < variables.length; i++){
                    const records = variables[i].Records;
                    if(records.length != 0){
                        exist = true;
                        break;
                    }
                }
                if(!exist){
                    for(let i = 0; i < variables.length; i++){
                        await deleteAPI(`/variables/${variables[i].id}`, token, {force: true});
                    }
                    await deleteAPI(`/exercises/${exercise.id}`, token, {force: true});
                }
            }
        }

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