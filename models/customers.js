var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    complaint: String
});


module.exports = mongoose.model('customers', customerSchema);