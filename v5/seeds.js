var mongoose   =require("mongoose");
var Campground   =require("./models/campground");
var Comment =    require("./models/comments");

var data =[
    {
        name:"Clouds resting",
        image: "https://cdn.pixabay.com/photo/2016/11/23/17/24/automobile-1853936__340.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"DEsert Mesa",
        image: "https://cdn.pixabay.com/photo/2015/08/13/17/30/womans-legs-887286__340.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"The beast",
        image: "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408__340.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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

