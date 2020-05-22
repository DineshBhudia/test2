const request = require('request');

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

//get all users and filter
const allUsers = (callback) =>{
    const url = "https://bpdts-test-app.herokuapp.com/users";
        request({url, json:true}, (error, {body})=>{       
            if(body.error){
                callback("Unable to find users", undefined)
            }    
            else{
                  const filtered_users = body.filter((users)=>{
                    return calcDistance(users.latitude, users.longitude) 
            })            
               callback(undefined, {filtered_users})
              
            } 
    })
}

//get lonon users
const londonUsers = (callback) =>{
    const url = "https://bpdts-test-app.herokuapp.com/city/London/users";
        request({url, json:true}, (error, {body})=>{        
             if(body.error){
                callback("Unable to find users", undefined)
            }    
            else{             
                callback(undefined, body)               
            } 
    })
}


module.exports = {allUsers, londonUsers}