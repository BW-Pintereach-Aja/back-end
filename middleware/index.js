const db = require('../database/config')
const jwt = require('jsonwebtoken')


//status code function-middleware
const stats = (code, msg) =>{
    res.status(code).json({
        message: msg
    })
};

// validation
function validation  ( stats, req, res, next ){
    if(req.body && req.body.username && req.body.password){
        next()
    } else{
        stats(400, "Username or Password not entered")
    }
}

function  restrict  () {
        return async( stats, req, res, next ) =>{
            try{
                const token = req.headers.authorization || req.cookies.token
                if(!token){
                    return stats(401, "Invalid Credentials 1")
                }
                jwt.verify(token, process.env.JWT_SECRET || 'All that noise', (err, decoded) =>{
                    if (err){
                        return stats(401, "Invalid Credentials 2")
                    }
                    next()
                })
            }catch (err){
                next(err)
            }
        }
}

module.exports = { validation, restrict, stats}

