var express    = require("express"),
    app        = express(), 
    mongoose   =require("mongoose"),
    bodyParser = require("body-parser"),
    Campground = require("./models/campground"),
    seedDB     = require("./seeds"),
    Comment    = require("./models/comments");


seedDB();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/yelp_app_v5_1", { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))




// Campground.create(
//     {
//          name:"Yosimte",
//          image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_1280.jpg",
//         description:"This is a huge peak, no bathroom, no water. Beatiful!!"
        
//     },
//          function(err,campground){
//              if(err)
//              {
//                  console.log(err);
//              }
//              else{
//                  console.log("Newly creatted Campground");
//                  console.log(campground);
//              }
//          })



app.get("/", function(req,res)
{
   res.render("landing") ;
});

app.get("/campgrounds", function(req,res)
{
    Campground.find({},function(err,allCampgrounds)
    {
        if(err){
            console.log(err)
        }
        else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds})
        }
    })
});


app.get("/campgrounds/new",function(req,res)
{
   res.render("campgrounds/new") 
});

app.post("/campgrounds",function(req,res)
{
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name:name ,image:image, description:description };
    // campgrounds.push(newCampground);
    Campground.create(newCampground, function(err,newlyCreated)
    {
        if(err)
        {
            console.log(err);
        }
        else{
             res.redirect("/campgrounds")
        }
    })
   
});



app.get("/campgrounds/:id", function(req,res)
{
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err)
       {
           console.log(err);
       }
        else{
            console.log(foundCampground);
               res.render("campgrounds/show",{campground: foundCampground}); 
        }
    });

})


// ==========================
// COMMENT ROUTES
//===========================

app.get("/campgrounds/:id/comments/new", function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err)
        {
            console.log(err)
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    })
})


app.post("/campgrounds/:id/comments", function(req,res)
{
    Campground.findById(req.params.id,function(err, campground)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds")
        }
        else{
            Comment.create(req.body.comment, function(err, comment)
            {
                if(err)
                {
                    console.log(err);
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect(("/campgrounds/"+campground._id));
                }
            })
        }
    })
})



app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Yelpcamp Server started");
})