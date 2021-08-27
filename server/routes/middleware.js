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

middlewares.getTrueFalse = (str) => {
  let res = '';
  if(str){
    if(str === 'true' || str === '1'){
        res = true;
    } else if (str === 'false' || str === '0'){
        res = false;
    } else {
        res = 'error';
    }
  }
  return res;
}

// middlewares
middlewares.isLoggedIn = async (req, res, next) => {
  if(!req.signedCookies.bodycheck){
    return res.status(401).json(middlewares.getFailure('cookie is required to identify user, log in first'));
  }
  let {token, id, exp, refreshToken} = req.signedCookies.bodycheck;
  if (!token) {
    return res.status(401).json(middlewares.getFailure('token is required'));
  }
  if (exp < Date.now()){ // access token이 만료된 경우 refresh token을 보내 검증 후 새로운 access token과 expire를 반환
    // refresh token이 유효한지 검사
    const newTokenResult = await axios({
      method: 'POST',
      url: `${API_URL}/auth/refresh`, 
      headers: {'bodycheck-access-token': token},
      data: {refreshToken},
    }).catch((err)=>{
      return res.status(err.response.status).json(middlewares.getFailure(err.response.data));
    });
    token = newTokenResult.data.data.token;
    exp = newTokenResult.data.data.exp;
    res.cookie('bodycheck', {token, id, exp, refreshToken}, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: false
    });
    console.log('token refreshed', new Date().toLocaleString());
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