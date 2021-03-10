const express = require('express');
const bodyParser = require('body-parser');
require('./mongoose');

const restraunt = require('./routers/restraunt');
const user = require('./routers/users')
const errorcontroller = require('./controllers/404');
const widget = require('./routers/widget');

const app = express()

const port = 6556;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
//handling CORS issue
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
// intercept OPTIONS method
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
    next();
    }
});

app.use('/restraunt',restraunt);
app.use(widget);
app.use(user);
app.use(errorcontroller.get404);


app.listen(port , () => {console.log("server is running in port "+port)});