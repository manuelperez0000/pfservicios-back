const {
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN,
    ACCESS_TOKEN ,
    SCOOPE,
    EXPIRES
} = process.env;

module.exports = {
    databaseName: "pfservicios",
    port: 8000,
    auth: {
        email: "pserviciosrecipient2024@gmail.com",
        password: "pfservicios2024",
        clientId:CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
        scope: SCOOPE,
        expires: parseInt(EXPIRES)
    }
}
