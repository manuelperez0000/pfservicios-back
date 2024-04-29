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
        email: "pfservicios28042024@hotmail.com",
        password: "P7sErvicios28042024",
    },
    paypalUrl: "https://api-m.sandbox.paypal.com"
}
