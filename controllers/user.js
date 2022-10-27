const User = require('../model/user')
const bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')


const register = async( req, res) => {

 const  { email, password, firstname, lastname } = req.body

    try {
        const oldUser = await User.findOne({ email })

        if( oldUser ) {
            return res.status(400).json({ message: 'User already exist login instead' })
            console.log(oldUser);
        }
        

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ email, password: hashedPassword, name: `${firstname} ${lastname}` })
        const token = await Jwt.sign( {newUser}, process.env.JWT_SECRET, { expiresIn: '2d' })

        res.status(201).json({ message: "user sucessfully created", token })
    } catch (error) {
        console.log(error);
    }
}
                
 
const login = async(req, res) => {
    const { email, password } = req.body
    try {
          
    const oldUser = await User.findOne({ email })
    if(!oldUser) return res.status(400).json({ message: "User doesn't exist" })

    console.log(oldUser);
    const checker = await bcrypt.compare(password, oldUser.password)
    if(!checker) return res.status(400).json({ message: "Password is not valid" })

    const token = Jwt.sign( {oldUser}, process.env.JWT_SECRET, { expiresIn: '2d'})
    res.status(200).json({ token, message: 'User successfully logged in' });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { register, login } 