//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-vishal:atlasDB113@cluster0.qv07y.mongodb.net/blogPostDB", {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect("mongodb://localhost:27017/blogPostDB", { useUnifiedTopology: true, useNewUrlParser: true });

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "aah! you forgot to add title."]
  },
  content: String
})

const Post = mongoose.model("Post", postSchema);

// home component
app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    if(err){
      console.log(err);
    } else{
      res.render("home", {startingContent: homeStartingContent, posts: posts});
    }
  });
});

// compose component
app.get("/compose", function(req, res){
  res.render("compose");
});

// post request
app.post("/compose", function(req, res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    } 
  });  

});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title, 
      content: post.content
    });
  });

});

// about component
app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

// contact component
app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server have started successfully.");
});

// 2020-08-14T14:43:57.797701+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/favicon.ico" host=sheltered-sands-34816.herokuapp.com request_id=59ac226e-d3d4-498c-82a9-e7a867e5b5ce fwd="47.30.152.89" dyno= connect= service= status=503 bytes= protocol=https
// 2020-08-14T14:50:50.437352+00:00 heroku[web.1]: State changed from crashed to starting
