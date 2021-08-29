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
        const { name, meal, memo, DateRecordId } = req.body;

        // name 검사
        if(!name){
            return res.status(400).json(getFailure(req.originalUrl + ' name is required and not null'));
        }

        // DateRecordId가 user의 DateRecord의 id인지 검사
        if(id != dateRecordGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' u can create only ur diet'))
        }
        
        const dietPostResult = await postAPI('/diets', token, {name, meal, memo, DateRecordId});
        
        return res.status(dietPostResult.status).json(dietPostResult.data);  

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
        const dietGetResult = await getAPI('/diets', token, {UserId:id})
        
        return res.status(dietGetResult.status).json(dietGetResult.data);

    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

router.get('/:date/me', isLoggedIn, async (req, res, next) => {
    try{
        const { token, id } = req.user;
        const UserId = req.user.id;
        const date = req.params;
        const dateRecordGetResult = await getAPI('/dateRecords', token, {date});

        const dietGetResult = await getAPI('/diets', token, {DateRecordId: dateRecordGetResult.data.data.id});
        
        return res.status(dietGetResult.status).json(dietGetResult.data);

    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})


// 로그인 유저 본인의 운동 수정, 해당 id의 운동이 로그인 유저의 것이 아닐 경우 에러
// me가 id에 속하는지
router.patch('/:id/me', isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const { token } = req.user;
        const UserId = req.user.id;

        if (!name) {
            return res.status(400).json(getFailure('Name is required'))
        }
        
        const dietGetResult = await axios({
            method: 'GET',
            url: `${API_URL}/diets/${id}`,
            headers: { 'bodycheck-access-token': token },
        }).catch((err) => {
            const status = err.response.status;
            if(status === 400 || status === 404){
                return res.status(status).json(err.response.data);
            }
        });

        if(UserId != dietGetResult.data.data.UserId){
            console.log(UserId, dietGetResult.data.data.UserId);
            return res.status(400).json(getFailure('u can update only ur exercise'));
        }

        const dietPatchResult = await axios({
            method: 'PATCH',
            url: `${API_URL}/diets/${id}`,
            headers: { 'bodycheck-access-token': token },
            data: { name },
        }).catch((err) => {
            const status = err.response.status;
            if(status === 400 || status === 404){
                return res.status(status).json(err.response.data);
            }
        });


        return res.status(dietPatchResult.status).json(dietPatchResult.data);
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
        const { token } = req.user;
        const UserId = req.user;

        // 내 DateRecord 가져와서 하위 Diet들의 id 중 id가 없으면 에러
        const dateRecordGetResult = await getAPI(`/dateRecords`, token, {UserId});

        const dietGetResult = await getAPI(`/diets`, token, {dateRecordGetResult});

        const diets = dietGetResult.data.data;
        let exist = false;
        for(let i = 0; i < diets.length; i++){
            if(diets[i].id == id){
                exist = true;
                break;
            }
        }
        if(!exist){
            return res.status(400).json(getFailure(req.originalUrl + ' u can only...'));
        }

        await deleteAPI(`/diets/${id}`, token);

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