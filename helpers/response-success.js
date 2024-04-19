const responseSuccess = (res, status, data) =>
    res.status(status).json({
        status,
        error:null,
        data,
    });
module.exports = responseSuccess;