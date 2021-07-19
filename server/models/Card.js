const {Schema,model,Types} = require('mongoose')

const schema = new Schema ({
    title: {
        type: String,
        required: [true],
        index: true
      },
      content: {
        type: String
      },
      listId: {
        type: String,
        required: [true]
      },
      sortOrder: {
        type: Number
      }
})

module.exports = model('Card',schema)