const axios = require('axios');
const {API_URL} = require('../config/const');

let request = {};

request.request = async (method, url, token, data, params) => {
  return await axios({
    method,
    url: API_URL + url,
    headers: {
      'bodycheck-access-token': token,
      'bodycheck-client-secret': process.env.CLIENT_SECRET,
    },
      data,
      params,
  });
}

request.getAPI = async (url, token, params) => {
  return await request.request('GET', url, token, null, params );
}

request.postAPI = async (url, token, data) => {
  return await request.request('POST', url, token, data, null);
}

request.patchAPI = async (url, token, data) => {
  return await request.request('PATCH', url, token, data, null);
}

request.deleteAPI = async (url, token, params) => {
  return await request.request('DELETE', url, token, null, params );
}


module.exports = request;