import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

// singup 
export const singup = async (req, res) =>{
    const {fullname, email, password} = req.body;
    try {
        // hash password
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"})
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "Email already exists"});

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            email,
            password : hashPassword
        })

        if(newUser){
            // generate jwt token here

        } else{
            res.status(400).json({message: "Invalid user data"});
        }
        
    } catch (error) {
        
    }
}

// login 
export const login = (req, res) =>{
    res.send("Login route")
}
export const logout = (req, res) =>{
    res.send("Logout route")
}
