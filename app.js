var express=require('express');
var path=require('path');
const expressValidator=require('express-validator');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var bodyParser=require('body-parser');
var flash=require('connect-flash');

var routes=require('./routes/index');
var users=require('./routes/users');

var app=express();

//View engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));
app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//express-session Middleware
app.use(session({
	secret:'secret',
	saveUninitialized:true,
	resave:true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Express Validator middleware
app.use(expressValidator({
	errorFormatter:function(param,msg,value){
		var namespace=param.split('.'),
		root= namespace.shift();
		formParam=root;

	while(namespace.length){
		formParam +='['+namespace.shift()+']';
	}
	return{
		param:formParam,
		msg:msg,
		value:value
	};

	}
}));

//connect-flash middleware
app.use(flash());
app.use(function(req,res,next){
	res.locals.messages=require('express-messages')(req,res);
	next();

});

//Define Routes
app.use('/',routes);
app.use('/users',users);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
console.log('server started at port 3000');
