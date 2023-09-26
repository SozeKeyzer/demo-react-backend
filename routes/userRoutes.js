const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const auth=require('../util/auth');

router.post('/register',userController.registerUser);
router.post('/login',userController.login);
router.post('/refresh',userController.refreshToken);
router.post('/logout',auth,userController.logout);
router.get('/home',auth,userController.home);
module.exports=router;