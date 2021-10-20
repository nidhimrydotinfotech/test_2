const client = require("../redisConfig");

exports.cacheMiddleware = (req, res, next) => {
    // console.log("Middleware called...");
    client.get(req.params.username, (err, value) => {
        if(err) throw err;

        if(value!== null){
            // res.json(value)
            console.log("from the cache")
            console.log("value from the cache" ,value)
            res.json({"from the cache" : value})
        
        }
        else{
            // return false
            next();
        }
    })
    // next();
}