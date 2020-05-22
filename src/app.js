
const path = require('path')
const express = require('express');
const users = require('./users.js')

const app = express()
const publicDirPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs');
app.use(express.static(publicDirPath));// to wire in the index.html file 

//work out distance from london
const calcDistance = (lat, lon) => {
    //london cordinates
    const londLat = 51.5085300;
    const londLon = -0.1257400;
    //check we have param and are not the same
    if ((!lat || !lon) || (lat == lon)) {
        return false;
    }
    else {
        var raLondlat = Math.PI * londLat / 180;
        var radLat = Math.PI * lat / 180;
        var theta = londLon - lon;
        var radTheta = Math.PI * theta / 180;
        var dist = Math.sin(raLondlat) * Math.sin(radLat) + Math.cos(raLondlat) * Math.cos(radLat) * Math.cos(radTheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515 * 0.8684;

        //if dist < 50 user within 50 miles of london
        if (dist < 50) {
            return true;
        } else {
            return false;
        }
    }
}

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

