const client = require("../redisConfig")

exports.getCacheUser = (req, res, next) => {
    client.get(req.params.id, (err, val) => {
        if(err) throw Error("value not found")

        if(val !== null){
            console.log("from the cache")
            res.json(JSON.parse(val))
        }
        else{
            next();
        }
    })
}