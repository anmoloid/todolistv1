const express=require("express")
const https=require("https")
const app=express()
const bodyParser= require("body-parser")
const Date=require(__dirname+"/date.js") //for the local modules which are not installed via npm we need to write the whole path
//this indicates that express needs to set the view engine to ejs
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
app.set("view engine","ejs")
let items= ["Wakeup", "Eat", "Work", "Sleep","Repeat"];
let workItems= [];
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
// when we are making a dynamic website and serving files via  a server
// we can no longer use "link rel="stylesheet" href="css/styles.css" to link css because express does not know this file.
app.get("/", function(req,res){
    
    Day=Date.getDate();
    //with ejs we need to use a new function called render that use a ejs file and the second argument is 
    // a js object that needs to be used in that ejs file
    res.render("list",{listTitle:Day, newListItems:items})
})

app.post("/", function(req,res){
    let newItem= req.body.item
    if(req.body.button === 'Work')
    {
        workItems.push(newItem)
        res.redirect("/work")
    }
    else{
        items.push(newItem)
        res.redirect("/")
    }
    

})

app.get("/work", function(req,res)
{
  
    res.render("list",{listTitle:"Work List", newListItems:workItems})
})
app.get("/about", function(req,res)
{
    
    res.render("about")
})

app.get('/g4j', function(req, res) {
    proxy.web(req, res, { target: 'http://k8s-serproxyserverrev-208670526f-1029014136.us-east-1.elb.amazonaws.com/' });
  });

app.listen(process.env.PORT||"3000", function(req,res){
    console.log("Server started at port 3000")
})
