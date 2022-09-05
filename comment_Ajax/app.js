const express = require("express");
const app = express();

const index_page = require("./index.js");
const comment_page = require("./comment.js");

const hostname = "192.168.1.223";
const port = 3000;

let page = index_page();
let comment = comment_page();

app.get("/",function(req,res){
    res.end(page);
})
app.get("/injection",function(req,res){
    console.log("success!!");
    res.send(comment);
})
app.listen(port,hostname, function(){
    console.log("Server running at 3000");
})