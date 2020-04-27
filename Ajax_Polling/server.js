var express = require('express')
var app = express()
var url = require('url');
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Database array
var DB = [];
// Constructor to put data into Database
var member = function(num,name,msg){
    this.num = num;
    this.name = name;
    this.msg = msg;
}

// Periodic Ajax connection from Browser to get lastest chat content
app.get('/', function(req,res){
    var _url = req.url;
    var queryData = url.parse(_url, true).query;
    var finalNum = queryData.num;
    var space = [];
    // if finalNum exist and is lower than DB number(which means there are new data), put new data into 'space' and send
    if(finalNum !== undefined){
        DB.forEach(function(item){
            if(item.num > finalNum){
                space.push(item);
            }
        })
        space = JSON.stringify(space);
        res.send(space);
    }
})
// Ajax connection from Browser to put new chat content into Database;
app.post('/', function(req,res){
    DB.push(new member(DB.length+1, req.body.name, req.body.msg))
})

// Server start
app.listen(3000, function(){
    console.log("start! express server is running on port 3000")
})

