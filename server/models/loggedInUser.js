exports = module.exports = function (app, mongoose) {
    const { Schema, SchemaTypes: { ObjectId } } = mongoose;
    const LoggedInUser = new Schema({
        token: {
            type: String,
            required: [true, "Please Provide token"],
        },
        user: {
            type: ObjectId,
            ref: 'User'
        }
    });
    app.db.model('LoggedInUser', LoggedInUser)
}