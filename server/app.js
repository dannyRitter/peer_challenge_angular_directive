/**
 * Created by Danny on 11/11/15.
 */
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

mongoose.connect('mongodb://localhost/zeta_favorite_number');
mongoose.model('Person', new Schema({"name": String, "location": String, "number": Number}, {collection: 'people'}));
var Person = mongoose.model('Person');


app.get("/data", function(req,res){
    Person.find({}, function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});


app.get("/*", function(req,res, next){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file));
});

app.listen(app.get("port"), function(req,res, next){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;