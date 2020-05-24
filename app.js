//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "Welcome to my blog Website! This is made of Node.js with its npm libraries such as Express.js, body-parser, lodash And also Templated using EJS.";
const aboutContent = "You can post your blog composing via '+' sign in top-right corner of this page. And get redirected to the home page . You can read your full article by clicking on 'Read More'.";
const contactContent = "No Need to contact me......😂😂😂 Sorry, the website will be upgraded with new features soon..";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/",function(req,res){
  res.render("home",{homePageContent: homeStartingContent, postItem: posts});
});

app.get("/about",function(req,res){
  res.render("about",{aboutPageContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactPageContent:contactContent});
});

app.get("/compose",function(req, res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/")
});

app.get("/post/:postName",function(req,res){
  postUrlName = lodash.lowerCase(req.params.postName);
  posts.forEach(function(post){
    postTitle = lodash.lowerCase(post.title);
    if(postUrlName === postTitle){
      res.render("post",{title: post.title, content: post.content});
    }
  });
  
});





app.listen(process.env.PORT, function() {
  console.log("Server started on port 3000");
});
