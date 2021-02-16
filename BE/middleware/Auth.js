const User = require("../model/User");
const {verify} = require("jsonwebtoken");

var middleware={}

middleware.authentication = async(req, res, next)=>{
    var authToken = req.header("Authorization");
    if(authToken){
        console.log(authToken)
        try{
            const decode = verify(authToken, process.env.SECRET_KEY );
            const user = await User.findOne({
                email:decode.email
            })
            console.log(user.email)
            req.user = user
                
            next()
        }catch(err){
            console.log("Here is the error", err.message)
        }
    }
    else{
        res.status(401).send("require Authorization Token")
    }
}

module.exports = middleware;