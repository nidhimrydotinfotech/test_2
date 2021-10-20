const mongoose = require("mongoose");
const util = require("util");
const client = require("../redisConfig");

const clientGet = util.promisify(client.get).bind(client);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function(){
    console.log("from the query builder")

    // console.log(this)
    const key =  JSON.stringify(Object.assign({} , this.getQuery(), {collection : this.mongooseCollection.name}))

    console.log(key);

    // console.log(clientGet());
    const cacheValue = await clientGet(key);

    if(cacheValue){
        // console.log("from the cache", cacheValue)
        return JSON.parse(cacheValue);
    }
   

    const result = await exec.apply(this, arguments);

    client.set(key, JSON.stringify(result));

    // console.log("from the server", result);

    return result;

  
}


const deleteKey = (key) => {
    client.del(key);
}

module.exports = deleteKey;

