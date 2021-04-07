//Modules
const express = require('express')
const ejs = require('ejs')
const app = express()
const fs = require('fs')
const path = require("path")
const { v4 } = require("uuid")

//EJS
app.engine('ejs', ejs.renderFile)
app.set('view engine', 'ejs')

//Middlewares
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Get date function
var dt = new Date();
const currentDate = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

/* File System */
const filePath = path.join('./data', "articles.json")
const read = fs.readFile
const write = fs.writeFile

//Home Page
app.get('/', (req, res) => {
  read(filePath, (err, data) => {
    if(err) throw err

    const posts = JSON.parse(data)

    res.render('index', {articles: posts})
  })

});

//Create Page
app.get('/create', (req, res) => {
  res.render('create', { error: null })
});

app.post('/create', async(req, res) => {
  const title = req.body.title
  const desc = req.body.desc
  const author = req.body.author

  if(title.trim() === "" || desc.trim() === "" || author.trim() === ""){
    res.render('create', { error: true })
  } else{
    read(filePath, (err, data) => {
      if(err) throw err

      const posts = JSON.parse(data)

      posts.unshift(
        {
          id: v4(), 
          title: title,
          desc: desc,
          author: author,
          date: currentDate
        }
      )

      write(filePath, JSON.stringify(posts, null, 4), err => {
        if(err) throw err

        res.render('index', {articles: posts})
      })
    })
  }
});

/* Rest API */
app.get('/api/v1/articles', (req, res) => {
  read(filePath, (err, data) => {
    if(err) throw err

    const articles = JSON.parse(data)

    res.json(articles)
  })

});


//Articles Page
app.get('/articles', (req, res) => {
  read(filePath, (err, data) => {
    if(err) throw err

    const posts = JSON.parse(data)

    res.render('articles', {articles: posts})
  })

});

//Detail Page
app.get('/:id', (req, res) => {
  const id = req.params.id

  read(filePath, (err, data) => {
    if(err) throw err

    const posts = JSON.parse(data)

    const post = posts.filter(note => note.id === id)[0]

    res.render('detail', { post: post })
  })
});

//Delete
/* app.delete("/delete/:id", async (req, res) => {
  const content = await read(filePath, "utf8")
  const articles = JSON.parse(content)

  const articleId = articles.findIndex(article => article.id === req.params.id)
  
  
  if(articleId > -1){
    const article = articles[articleId]
    articles.splice(articles, 1)

    await write(filePath, JSON.stringify(articles))

    res.send('articles')
  }
  else{
    res.send("error")
  }
  
}) */


//Server
const PORT = process.env.PORT || 4000
app.listen(PORT, err => {
  if(err){
    console.log(err);
  }

  console.log('Server is running on ' + PORT);
});