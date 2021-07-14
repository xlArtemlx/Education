const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()

// /api/auth/register
router.post('/register', 
[
check('email','Некоректный email').isEmail(),
check('password','Минимальная длинна пароля 6 символов').isLength({min:6})
],
async (req,res)=>{
    try {
        // const errors = validationResult(req)
        // if(erroes.isEmpty()){
        //     return res.status(400).json({
        //         errors:errors.array(),
        //         message:'Некорректные данные при регистрации'
        //     })
        // }
        const {email,password} = req.body
        console.log(email,password)
        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message: 'Такой пользователь уже существует'}).isLength({min:6})
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User({email,password: hashedPassword})

        await user.save()
        res.status(201).json({message:'Новый пользователь создан'})

    } catch(e){
        res.status(500).json({message:'Ошибка подключения сервера'})
    }
})

// /api/auth/login
router.post('/login',

[
    check('email','Не верный email').normalizeEmail().isEmail(),
    check('password','Пустой пароль').exists()
], 

    async (req,res)=>{
    try {
        const errors = validationResult(req)
        if(erroes.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Некорректные данные при регистрации'
            })
        }

        const {email,password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return status(400).json({message: 'Пользователь с таким Email не найден'})
        }
        
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                message:'Неверный пароль'
            })
        }

        const token = jwt.sign(
            {userId:user.id},
            config.get('jwtSecret'),
            {expiresIn:'1h'}
        )
        res.json({
          token,userId:user.id  
        })

    } catch(e){
        
    }
})

module.exports = router