const {Router} = require('express')
const Boards = require('../models/Boards')
const router = Router()

router.post('/boards', async (req,res)=>{
    try {
        const {board} = req.body
    } catch(e){
        res.status(500).json({message:'Ошибка подключения сервера'})
    }
})

// router.post('/addboard', async (req,res)=>{
//     try {

//     } catch(e){
        
//     }
// })

module.exports = router