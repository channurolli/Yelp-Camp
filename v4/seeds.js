var mongoose   =require("mongoose");
var Campground   =require("./models/campground");
var Comment =    require("./models/comments");

var data =[
    {
        name:"Clouds resting",
        image: "https://cdn.pixabay.com/photo/2016/11/23/17/24/automobile-1853936__340.jpg",
        description: "blah blha blah blah"
    },
    {
        name:"DEsert Mesa",
        image: "https://cdn.pixabay.com/photo/2015/08/13/17/30/womans-legs-887286__340.jpg",
        description: "blah blha blah blah"
    },
    {
        name:"The beast",
        image: "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408__340.jpg",
        description: "blah blha blah blah"
    }
]

function seedDB(){
    Campground.remove({},function(err)
    {
        if(err){
            console.log(err)
        }
            console.log("Removed campgrounds!");
            data.forEach(function(seed)
            {
                 Campground.create(seed, function(err, campground)
                {
                     if(err)
                    {
                        console.log(err)
                    }
                    else{
                        console.log("added a campground");
                        
                        Comment.create(
                            {
                                text:"This pLace is great!!!",
                                author:"Homer"
                            },function(err, comment)
                            {
                                if(err)
                                {
                                   console.log(err) 
                                }
                                else{
                                     campground.comments.push(comment);
                                     campground.save();
                                     console.log("created new comments");
                                }
                               
                            })
                    }
                })
            })
    });
}

module.exports = seedDB;

