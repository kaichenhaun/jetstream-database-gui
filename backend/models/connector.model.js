const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectorSchema = new Schema({
    connector_name: {
        type: String,
        required: true,
        trim: true,
    },
    connector_type: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
}, {
    timestamps: true
})

const Connector = mongoose.model('Connectors', connectorSchema);

module.exports = Connector;