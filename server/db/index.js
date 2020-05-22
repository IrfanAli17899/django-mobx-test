exports = module.exports = function (app, mongoose) {

    app.db = mongoose.createConnection(app.get("MONGOOSE_URI"), { useNewUrlParser: true });

    app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
    app.db.once('open', function () {
        console.log('mongoose open for business');
    });


}