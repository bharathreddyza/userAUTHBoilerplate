var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const port = 3200;
const bodyParser = require('body-parser')
const db = require('./models')
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy

var app = express();
var flash=require("connect-flash");

//set default engine 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs')



app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(flash());

app.use(session({
  secret: 'testSecret',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}))

//init passport

app.use(passport.initialize())
app.use(passport.session())


//////////use localstartegy
///email and password 
// pass to function if user is found compare pasaword 



passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(username, password,done){
    
    db.USERS.getUserByEmail(username,function(err,user){
      if(err) throw err
      if(!user){
        return done(null, false, {message : 'Unknown User'})
      }
      db.USERS.comparePassword(password,user.password, function(err,isMatch){
        if(err) throw err
        if(isMatch){
          return done(null,user)
        }else{
          return done(null,false, {message: 'Invalid Password'})
        }
      })
    })
  }
))


// serialize passport

passport.serializeUser(function(user,done){

  done(null,user.id)
})

passport.deserializeUser(function(id,done){
  db.USERS.getUserById(id,function(err,user){
    done(err,user)
  })
})

// send the user object to every route handler 
app.use((req,res,next)=>{
  console.log(res.locals)
  // res.locals.user = req.user 
  res.locals.currentUser = req.user
  next()
})



// app.use(function (req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   res.locals.user = req.user || null;
//   next();
// });
//routes

const productsRouter = require('./routes/products')
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login')
var homeRouter = require('./routes/home')
const ordersRouter = require('./routes/orders')

app.use('/', homeRouter);
app.use('/login',loginRouter)
app.use('/register',registerRouter)
app.use('/products' , productsRouter)
app.use('/orders' , ordersRouter)



app.get('/logout',(req,res)=>{
  req.logOut();
  req.session.destroy(()=>{
    res.clearCookie()
    res.redirect('/')

  });
}) 


// app.use(function(req, res, next) {
//     next(createError(404));
//   });

// //  error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });



app.listen(port,()=>console.log(`port is running at ${port}`))