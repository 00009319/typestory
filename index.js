//Modules
const express = require('express')
const ejs = require('ejs')
const app = express()

//EJS
app.engine('ejs', ejs.renderFile)
app.set('view engine', 'ejs')

//Middlewares
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
});





//Server
const PORT = process.env.PORT || 4000
app.listen(PORT, err => {
  if(err){
    console.log(err);
  }

  console.log('Server is running on ' + PORT);
});