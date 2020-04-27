var express = require('express')
var app = express()
var url = require('url');
var bodyParser = require('body-parser')
var time = require('./time.js');
var arr = [];
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Ajax Post request
app.post('/', function(req,res){
    if(req.body.email === undefined){                           // Post request 
        console.log("POST REQUEST(/) from Brower!");
        res.send("Post welcome! ")
    }else{                                                      // Post request with JSON
        console.log("POST REQUEST(/) with JSON( { key : value } ) from Brower!");
        res.send(req.body.email);
    }
})

// Ajax Get request
app.get('/', function(req,res){
    var _url = req.url;
    var _time = time.SHOW();
    var queryData = url.parse(_url, true).query;
     
    if(queryData.id === undefined){                             // Get request without Parameter
        console.log("GET REQUEST(/) from Brower!");
        res.send("<h4>안녕하세요</h4>")
    }else{                                                      // Get request with Parameter and time.js(module)
        console.log("GET REQUEST(/) with Parameter(id=time) from Brower!");
        res.send(_time);
    }
})

// Server start
app.listen(3000, function(){
    console.log("start! express server is running on port 3000")
})