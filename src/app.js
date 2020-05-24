
const path = require('path')
const express = require('express');
const users = require('./users.js')

const app = express()
const publicDirPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs');
app.use(express.static(publicDirPath));// to wire in the index.html file 

//home route
app.get('', (req, res) =>{
   
users.allUsers((error, user) =>{
    if(error){
        return res.send({error})
    }   
    
     users.londonUsers((error, lon_user) =>{
        if(error){
            return res.send({error})
        }          
        res.render('index', {user, lon_user});
        
       })   
    })
})


app.listen(8000, ()=>{
    console.log('server running')
})

