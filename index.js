//Modules
const express = require('express')
const ejs = require('ejs')
const app = express()

//EJS
app.engine('ejs', ejs.renderFile)
app.set('view engine', 'ejs')

//Middlewares
app.use('/static', express.static('public'))

//Home Page
app.get('/', (req, res) => {
  res.render('index')
});

//Create Page
app.get('/create', (req, res) => {
  res.render('create')
});

//Get date function
var dt = new Date();
const currentDate = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

const articles = [

  {
    "title": "asdbsa",
    "desc": "sdasd",
    "date": currentDate,
    "author": "jakhongir"
  },

  {
    "title": "Dasturchi bo'lmang",
    "desc": "sdasd",
    "date": currentDate,
    "author": "Azimjon Po'latov"
  }
  
]

//Articles Page
app.get('/articles', (req, res) => {
  res.render('articles', {articles: articles})
});






//Server
const PORT = process.env.PORT || 4000
app.listen(PORT, err => {
  if(err){
    console.log(err);
  }

  console.log('Server is running on ' + PORT);
});