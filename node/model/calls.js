const mongoose = require('mongoose')

const CallSchema = new mongoose.Schema({
    user: {type: String, required: true},
    phone: {type: String, required: true},
    name: {type: String, required: true},
    timestamp: {type: Date, required: true}
}, {collection:'calls'})
const callsModel = mongoose.model("CallSchema", CallSchema);
module.exports = callsModel