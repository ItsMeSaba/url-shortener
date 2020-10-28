const mongoose = require('mongoose');

let urlsSchema = mongoose.Schema({
    url : {
        type : String,
        required : true
    },
    newUrl : {
        type : String,
        required : true
    },
});

module.exports = mongoose.model('Url', urlsSchema);