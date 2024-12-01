import express from 'express';
import { login, logout, singup, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

/* 
router.post('/singup', (req, res)=>{
    res.send("signout route")
}); 
*/

router.post('/singup', singup);
router.post('/login', login);
router.post('/logout', logout);

router.put("/update-profile", protectRoute, updateProfile);

export default router;