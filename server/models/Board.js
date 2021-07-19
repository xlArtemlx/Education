const {Schema,model} = require('mongoose')

const schema = new Schema ({
    title: {
        type: String,
        required: [true],
        index: true
    }
})

module.exports = model('Board',schema)