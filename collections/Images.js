const {Schema, model} = require('mongoose')

const schema = new Schema({
    path: {type: String, required: true}
})

module.exports = model('Images', schema)
