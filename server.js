const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=> {
    if (err){
      console.log('Unable to append to Server Log File !');
    }
  });
  next();
});
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return (new Date().getFullYear());
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to the Home Page'
  });
});
app.get('/about',(req,res) => {
  // res.send('<h1>About Page !');
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage : 'Unable to handle request'
  });
});
app.listen(port,()=>{
  console.log(`Server listening at port ${port}!`);
});
