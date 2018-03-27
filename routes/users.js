var express=require('express');
var router=express.Router();

//Login Page-get Request
router.get('/login',function(req,res){
	res.render('login');
});

//Register Page -get 
router.get('/register',function(req,res){
	res.render('register');
});
	

module.exports=router;
