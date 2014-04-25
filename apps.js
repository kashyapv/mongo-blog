var express = require('express');
var fs = require('fs');
var routes = require('./routes/connect');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/mongo-blog');

var app = express();

app.use(express.static(__dirname + '/public'));

app.locals({
  title: 'Blog',
});

// app.all('*', function(req, res, next){
//   fs.readFile('posts.json', function(err, data){
//     res.locals.posts = JSON.parse(data);
//     next();
//   });
// });

app.get('/', routes.index);
app.get('/newpost', routes.newpost);
// app.get('/api/posts', routes.json);

app.get('/post/:slug', function(req, res, next){
  res.locals.posts.forEach(function(entry){
    if (req.params.slug === entry.slug){
      res.render('post.ejs', { post: entry });
    }
  })
});

// app.post('/addpost', routes.addpost(db))

app.get('/*', function(req, res){
    res.render('404.ejs');
});

app.listen(3000);
console.log('app is listening at localhost:3000');