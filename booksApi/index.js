require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const { compareSync } = require("bcrypt")
const { sign, verify } = require("jsonwebtoken")
const db = require("./db")
const { getBooks, addBook, updateBook, deleteBook } = require("./controller")

const app = express()
const port = process.env.PORT || 8000
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors({
    origin: '*'
  }));
// middleware
  const midleware = (req,res,next)=>{
    let token = req.get('authorization')
    if(!token){
        return res.send({error:"token is required"})
    }else if(token){
        verify(token.slice(7),"key12wertefvvwegfugayYGGYGYVvuygYvygijnbjvuvibUYuiuh2uubgcbc",(err,user)=>{
            if(user){
                next()
            }else{
                return res.send({error:"Invalid access token"})
              }
    })
     
    }
  
  }
  

//   login
  app.post('/api/login',(req,res)=>{
    db.getConnection((err,connection)=>{
        console.log(err)
     if(err) return res.send({error:"failed to connect"})
     let data = req.body
     if(!data.email || !data.password) return res.send({error:"Username and password required"})
     connection.query("SELECT * FROM `users` WHERE `email`=?",[data.email],(err,rows)=>{
       connection.release()
       console.log(err)
       if(err) return res.send({error:"failed"})
       if(rows.length!=1) return res.send({error:"User not found"})
       if(!compareSync(data.password,rows[0].password)) return res.send({error:"Username or password is wrong"})
       rows[0].password = ''
       let token = sign({result:rows[0]},"key12wertefvvwegfugayYGGYGYVvuygYvygijnbjvuvibUYuiuh2uubgcbc",{
        expiresIn:'21h'
       })
       res.send({user:rows[0],token})
     })
    })
   })

// Routes

// get books
   app.get('/api/books',getBooks)
// add book
   app.post('/api/book/add',midleware,addBook)
// update book
   app.post('/api/book/update',midleware,updateBook)
// delete book
   app.post('/api/book/delete',midleware,deleteBook)

   app.listen(port,()=>console.log(`listening to port ${port}`))



