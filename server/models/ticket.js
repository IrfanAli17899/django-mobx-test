exports = module.exports = function (app, mongoose) {
    const { Schema, SchemaTypes: { ObjectId } } = mongoose;

    const TicketSchema = new Schema({
        user: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        hotel: {
            type: String,
            required: true

        },
        name: {
            type: String,
            required: true
        },
        maxPurchaseCount: {
            type: Number,
            required: true
        },
        remaining: {
            type: Number,
            required: true
        }
    });

    app.db.model('Ticket', TicketSchema)
}