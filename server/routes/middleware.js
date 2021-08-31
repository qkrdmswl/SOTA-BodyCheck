const { postAPI } = require('./request');

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
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  return regExp.test(email);
}

middlewares.verifyPassword = (password) => {
  //  8 ~ 10자 영문, 숫자 조합
  const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/
  return regExp.test(password);
}

middlewares.verifyDate = (date) => {
  const regExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
  return regExp.test(date);
}

middlewares.verifyTime = (time) => {
  const reg1 = /^(0[0-9]|1[0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])$/;
  const reg2 = /^(0[0-9]|1[0-9]|2[0-4]):([0-5][0-9])$/;
  return reg1.test(time) ? true : ( reg2.test(time) ? true : false );
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
  try {

    if(!req.signedCookies.bodycheck){
      return res.status(401).json(middlewares.getFailure('cookie is required to identify user, log in first'));
    }
    let {token, id, exp, refreshToken} = req.signedCookies.bodycheck;
    if (!token) {
      return res.status(401).json(middlewares.getFailure('token is required'));
    }
    if (exp < Date.now()){ // access token이 만료된 경우 refresh token을 보내 검증 후 새로운 access token과 expire를 반환
      // refresh token이 유효한지 검사
      const newTokenResult = await postAPI('/auth/refresh', token, {refreshToken, id});
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
  } catch (err){

  }
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