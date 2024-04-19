const responseErrors = (res, status, error, msg) =>
    res.status(status).json({
        status,
        data: {
            status,
            error,
            msg,
        },
    });
module.exports = responseErrors;