exports = module.exports = function (app, mongoose) {
    const { Schema } = mongoose;
    
    const hotelSchema = new Schema({
        name: {
            type: String,
            required: [true, "Hotel Name Required"]
        }
    })

    const UserSchema = new Schema({
        username: {
            type: String,
            required: [true, "Please Provide Username"],
            unique: [true, "Username Already Exist"],
        },

        email: {
            type: String,
            required: [true, "Please Provide Email"],
            unique: [true, "Email Already Exist"],
        },

        password: {
            type: String,
            required: [true, "Please Provide Password"],
        },
        hotels: [hotelSchema]
    });
    app.db.model('User', UserSchema)
}