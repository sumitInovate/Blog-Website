//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const lodash = require("lodash");

mongoose.connect("mongodb+srv://admin-sumit:Nalasopara123@cluster0-2lfe2.mongodb.net/blogDB",{useNewUrlParser:true, useUnifiedTopology:true});

const postSchema = {
  title:String,
  content:String
}


const Post = mongoose.model('Post',postSchema);

const homeStartingContent = "Welcome to my blog Website! This is made of Node.js with its npm libraries such as Express.js, body-parser, lodash And also Templated using EJS.";
const aboutContent = "You can post your blog composing via '+' sign in top-right corner of this page. And get redirected to the home page . You can read your full article by clicking on 'Read More'.";
const contactContent = "You can head over to following Methods to contact us for collaborations.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts =[]

app.get("/",function(req,res){
  Post.find({},function(err,foundPost){
    if(err){
      console.log(err);
    }else{
      console.log(foundPost);
    }
    res.render("home",{homePageContent: homeStartingContent, postItem: foundPost});
  })
  
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
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
  res.redirect("/")
});

app.get("/post/:postId",function(req,res){
  const postUrlName = lodash.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;
  Post.findOne({_id:requestedPostId},function(err,post){
    if(!err){
      res.render("post",{title: post.title, content: post.content});
    }
  });
  
});


const port = process.env.PORT;
if(port == null ||port ==""){
  port = 3000;
}


app.listen(port, function() {
  console.log("Server started on port 3000");
});
