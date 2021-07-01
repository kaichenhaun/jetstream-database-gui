const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 24,
        maxlength: 24
    },
    status: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    valid_until: {
        type: Date,
        required: true,
        unique: false
    }
}, {
    timestamps: true
})

const Subscription = mongoose.model('Subscriptions', subscriptionSchema);

module.exports = Subscription;