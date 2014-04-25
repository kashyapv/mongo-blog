var monk = require('monk');
var db = monk('localhost:27017/mongo-blog');

exports.index = function(req, res){
    // db.collection('postsdb', function(err, collection){
    //     collection.find().toArray(function(err,items) {
    //         res.send(items);
    //     });
    // });
  return function(req,res) {
    var collection = db.get('postsdb');
    collection.find({},{},function(e,docs){
        res.render('index.ejs', {
            "posts" : posts
        });
    });
  };
};

exports.newpost = function(req, res){
  res.render('newpost.ejs');
};

// exports.json = function(req, res){
//   res.json(res.locals.posts);
// };

exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var title = req.body.title;
        var author = req.body.author;
        var bodytext = req.body.bodytext;
        var tags = req.body.tags;

        // Set our collection
        var collection = db.get('postsdb');

        // Submit to the DB
        collection.insert({
            "title": title,
            "author": author,
            "body": bodytext,
            "tags": tags
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("/");
                // And forward to success page
                res.redirect("/");
            }
        });

    }
}