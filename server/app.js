const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express()


app.use(bodyParser.json())
app.use('/api/auth',require('./routes/user.routes'))
app.use('/api/board',require('./routes/board.routes'))
app.use('/api/list',require('./routes/list.routes'))
app.use('/api/card',require('./routes/card.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
    }catch(e){
        console.log("Serer error",e.message)
        process.exit(1)
    }
}
start()

app.listen(PORT,()=>{
    console.log('port 5000')
})