const express = require("express");
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');
const { isLoggedIn, getValidationError, getNoSuchResource, getSuccess, getFailure } = require('./middleware');


router.post('/me', async (req, res, next) => {
    try {
        // body {file}
        const {file} = req.body;
        const fd = new FormData();
        console.log(req.body);
        // fd.append('img', file);
        // const ress = await axios.post("http://localhost:5001/files/imgg", fd, {
        //         headers: {
        //             "bodycheck-access-token":
        //             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuZXdAbmV3LmNvbSIsImlhdCI6MTYzMDQwMjc5MCwiZXhwIjoxNjMwNDA2MzkwLCJpc3MiOiJzb3RhIn0.CXKCS4Cs2bA9uaY8MX9Jr5LvmOxsbCqME_krR5hwh_I",
        //         },
        //     });

        return res.status(200).json(getSuccess());
    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;