
const jwt = require("jsonwebtoken")
const secret = "kuchbhi"
function setUser(user){

    return jwt.sign({
        _id:user._id,
        email:user.email
        
    },secret)
}

function getUser(token){
    return jwt.verify(token,secret)
}

const authi= function(req,res,next){
    try{
       if(req.url == "/signup" && req.method == "POST"){
        next()
        return
       }
        let token = req.cookies.jwtToken
        if(token){
            if( getUser(token)){
                
                
                if(req.method == "GET" && req.url == "/login" || req.url == "/signup"){
                    res.redirect("/")
                }
                
                
            }else{
                
                res.redirect("/login")
                
            }
            
        }else{
            
            res.status(401);
        }
        next()
    }catch(e){
        console.log(e);
    }
    
}
module.exports = {setUser,getUser,authi}