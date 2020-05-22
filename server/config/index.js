exports = module.exports = function (app) {
    app.set("MONGOOSE_URI", process.env.MONGOOSE_URI || "mongodb://irfanali17899:irfanali.17899@ds343217.mlab.com:43217/practice")
    app.set("passwordSalt", process.env.passwordSalt || "17899")
    app.set("tokenSecret", process.env.tokenSecret || "17899")
}