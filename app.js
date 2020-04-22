var express = require('express');
var path = require('path');
const port = 3200;
const bodyParser = require('body-parser')
const db = require('./models')
var app = express();
app.set('view engine','ejs')

app.set('views', path.join(__dirname, 'views'));


var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login')
var homeRouter = require('./routes/home')
//set default engine 


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', registerRouter);
app.use('/login',loginRouter)
app.use('/home',homeRouter)

app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });



app.listen(port,()=>console.log(`port is running at ${port}`))