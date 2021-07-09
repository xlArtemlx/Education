const {Schema,model} = require('mongoose')

const schema = new Schema ({
    name:{type:String,required:true}
})

modula.exports = model('Boards',schema)