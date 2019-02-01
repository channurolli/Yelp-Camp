var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
var campgrounds = [
            {name:"Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
            {name:"Yosimte", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_1280.jpg"},
            {name:"Lake Tahoe", image:"https://cdn.pixabay.com/photo/2013/03/02/02/41/city-89197_1280.jpg"},
            {name:"Lake Tahoe", image:"https://cdn.pixabay.com/photo/2013/03/02/02/41/city-89197_1280.jpg"},
            {name:"Lake Tahoe", image:"https://cdn.pixabay.com/photo/2013/03/02/02/41/city-89197_1280.jpg"},
            {name:"Lake Tahoe", image:"https://cdn.pixabay.com/photo/2013/03/02/02/41/city-89197_1280.jpg"},
            {name:"Lake Tahoe", image:"https://cdn.pixabay.com/photo/2013/03/02/02/41/city-89197_1280.jpg"},
            {name:"Lake Tahoe", image:"https://cdn.pixabay.com/photo/2013/03/02/02/41/city-89197_1280.jpg"},
            
];

app.get("/", function(req,res)
{
   res.render("landing") ;
});

app.get("/campgrounds", function(req,res)
{
    res.render("campgrounds", {campgrounds:campgrounds})
});


app.get("/campgrounds/new",function(req,res)
{
   res.render("new.ejs") 
});

app.post("/campgrounds",function(req,res)
{
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name ,image:image };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds")
});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Yelpcamp Server started");
})