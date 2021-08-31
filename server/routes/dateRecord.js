const express = require('express');
const axios = require('axios');
const { isLoggedIn, getSuccess, getFailure, getValidationError, verifyDate, verifyTime } = require('./middleware');
const {  getAPI, postAPI, patchAPI, deleteAPI} = require('./request');
const { API_URL } = require('../config/const');
const router = express.Router();

router.post('/me', isLoggedIn, async (req, res, next) => {
    try {
        // 
        const { token} = req.user;
        const UserId = req.user.id
        const { date,startTime,endTime,memo } = req.body;

        if(!verifyDate(date)){
            return res.status(400).json(getFailure(req.originalUrl + ' date: yyyy-mm-dd'));
        }

        const dateRecordPostResult = await postAPI('/dateRecords', token, {
            date, startTime, endTime, memo, UserId
        });

        return res.status(dateRecordPostResult.status).json(dateRecordPostResult.data);

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
        const { token } = req.user;
        const UserId = req.user.id;
        const dateRecordGetResult = await getAPI('/dateRecords', token, {UserId});

        return res.status(dateRecordGetResult.status).json(dateRecordGetResult.data);

    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

router.get('/:date/me', isLoggedIn, async (req, res, next) => {
    try {
        const { token } = req.user;
        const UserId = req.user.id;
        const {date} = req.params;

        if(!verifyDate(date)){
            return res.status(400).json(getFailure(req.originalUrl + ' date: yyyy-mm-dd'));
        }

        const dateRecordGetResult = await getAPI('/dateRecords', token, {UserId, date});

        return res.status(dateRecordGetResult.status).json(dateRecordGetResult.data);

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
        const { date,startTime,endTime,memo  } = req.body;
        const { token } = req.user;
        const UserId = req.user.id;

        if(!verifyTime(startTime) || !verifyTime(endTime)){
            return res.status(400).json(getFailure(req.originalUrl + ' time: hh:mm:ss or hh:mm'));
        }

        const dateRecordGetResult = await getAPI(`/dateRecords/${id}`, token);
        if(UserId != dateRecordGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur dateRecord'));
        }

        const dateRecordPatchResult = await patchAPI(`/dateRecords/${id}`, token, {
            date,startTime,endTime,memo
        });

        return res.status(dateRecordPatchResult.status).json(dateRecordPatchResult.data);
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
        // 프론트는 dateRecord 삭제 전 레코드 삭제해야 함.

        const { id } = req.params;
        const { token } = req.user;
        const UserId = req.user.id;

        // id 검사
        const dateRecordGetResult = await getAPI(`/dateRecords/${id}`, token);
        // /me 검사
        if(UserId != dateRecordGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur dateRecord'));
        }

        await deleteAPI(`/dateRecords/${id}`, token);

        return res.status(204).json();
    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

// file upload & download

router.post('/:id/upload', isLoggedIn, async (req, res, next) => {
    try {
        // 프론트는 dateRecord 삭제 전 레코드 삭제해야 함.

        const { id } = req.params;
        const { token } = req.user;
        const UserId = req.user.id;
        const {file, description} = req.body;

        // id 검사
        const dateRecordGetResult = await getAPI(`/dateRecords/${id}`, token);
        // /me 검사
        if(UserId != dateRecordGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur dateRecord'));
        }

        const uploadResult = await postAPI(`/dateRecords/${id}/files/upload`, token, {file, description});


        return res.status(uploadResult.status).json(uploadResult.data);
    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})

router.get('/:id/files', isLoggedIn, async (req, res, next) => {
    try {
        // 프론트는 dateRecord 삭제 전 레코드 삭제해야 함.

        const { id } = req.params;
        const { token } = req.user;
        const UserId = req.user.id;

        // id 검사
        const dateRecordGetResult = await getAPI(`/dateRecords/${id}/files`, token);
        // /me 검사
        if(UserId != dateRecordGetResult.data.data.UserId){
            return res.status(400).json(getFailure(req.originalUrl + ' not ur dateRecord'));
        }

        const getResult = await getAPI(`/dateRecords/${id}`, token, {file, description});


        return res.status(getResult.status).json(getResult.data);
    } catch (err) {
        if(err.response){
            return res.status(err.response.status).json(err.response.data);
        }
        console.error(err);
        next(err);
    }
})
module.exports = router;