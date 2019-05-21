let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

try{
    // Connect to Mongoose and set connection variable
    mongoose.connect('mongodb://<USERNAME>:<PASSWORD>@ds151596.mlab.com:51596/vehicle-inventory', {useNewUrlParser: true});
    var db = mongoose.connection;
}catch(err) {
    console.error(err);
}

var port = process.env.PORT || 8080;

app.get('/',(req,res) => res.send('Express works'));

// Use Api routes in the App
app.use('/api', apiRoutes);

app.listen(port, function(){
    console.log("Running on port " + port);
});
