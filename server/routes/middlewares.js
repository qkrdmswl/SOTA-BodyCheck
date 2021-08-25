const jwt = require('jsonwebtoken');
const axios = require('axios');
const {API_URL} = require('../config/const');

let middlewares = {};

// utils
middlewares.getSuccess = (data) => {
  return {
    success: true,
    message: null,
    data
  }
}

middlewares.getFailure = (message) => {
  if (!message) {
    message = 'data not found';
  }
  return {
    success: false,
    message,
    data: null
  }
}

middlewares.updateForEach = async (record, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  let obj = new Object();
  let isSame = true;
  for(let i = 0; i < keys.length; i++){
    if(values[i]){
      if(values[i] != record.getDataValue(keys[i])){
        isSame = false;
        obj[keys[i]] = values[i];
      }
    }
  }
  if(!isSame){
    await record.update(obj);
  }
  return isSame;
}

middlewares.verifyEmail = (email) => {
  var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  return regExp.test(email);
}

middlewares.verifyPassword = (password) => {
  //  8 ~ 10자 영문, 숫자 조합
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
  return regExp.test(password)
}

// middlewares
middlewares.isLoggedIn = async (req, res, next) => {
  let {token, id, expire, refreshToken} = req.signedCookies.bodycheck;
  if (!token) {
    return res.status(401).json(middlewares.getFailure('token is required'));
  }
  if (expire < Date.now()){ // access token이 만료된 경우 refresh token을 보내 검증 후 새로운 access token과 expire를 반환
    // refresh token이 유효한지 검사
    const newTokenResult = await axios.post(`${API_URL}/auth/refresh`, {id, refreshToken});
    token = newTokenResult.data.data.token;
    expire = newTokenResult.data.data.expire;
    res.cookie('bodycheck', {token, id, expire, refreshToken}, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: false
    });
  }
  req.user = {token, id};
  next();
};

middlewares.getNoSuchResource = (name, where) => {
  return {
    message: `no ${name}`,
    detail: {
      resource: name,
      where: where,
    }
  }
}

middlewares.getValidationError = (params) => {
  let validationError = {
    name: 'ValidationError',
    errors: {},
  };
  let isValid = true;
  let paramNames = Object.keys(params);
  let paramValues = Object.values(params);

  for (let i = 0; i < paramNames.length; i++) {
    if (!paramValues[i]) {
      isValid = false;
      validationError.errors[paramNames[i]] = {
        message: `${paramNames[i]} is required`,
        value: paramValues[i],
      }
    }
  }

  return (isValid) ? null : validationError;
}
module.exports = middlewares;