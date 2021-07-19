const {Schema,model} = require('mongoose')

const schema = new Schema ({
    title: {
        type: String,
        required: [true, "Please enter a title"],
        index: true
      },
      boardId: {
        type: String,
        required: [true],
        index: true
      },
      sortOrder: {
        type: Number
      }
})

module.exports = model('List',schema)