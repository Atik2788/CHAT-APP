import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// singup
export const singup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if(!fullName || !email || !password){
      return res.status(400).json({ message: "All field are required  " });
    }
    // hash password
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // matching email in DB
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // password incript with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // new user
    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({message: 'Internal Server Error'})
  }
};


// login
export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    // compare user email from body with database
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({message: "Invalid credentials"})
    }

    // compare password from body with batabase
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
      return res.status(404).json({message: "Invalid credentials"})
    }

    generateToken(user._id, res)

    res.status(200).json({
      _id:user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic
    })

  } catch (error) {
    console.log("Error in login controller", error.message)
    res.status(500).json({message: "Internal server error"})
  }
};


export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0})
    return res.status(200).json({message: "Logged out successfully"})
  } catch (error) {
    console.log("Error in login controller", error.message)
    res.status(500).json({message: "Internal server error"})
  }
};

// update profile
export const updateProfile = (req, res) =>{
  
}
