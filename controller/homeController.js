const { default: axios } = require("axios");
const deleteKey = require("../config/cache");
const User = require("../modal/userSchema");
const client = require("../redisConfig");


exports.home = ( req, res) => {
    res.json({"name": "hello from home page"})
}

exports.about = (req, res) => {
    res.json({"name": "about page"})
}

// add user
exports.addUser = async (req, res) => {

    const newUser = await User.create(req.body);
    // console.log(newUser)
    res.json(newUser);
    deleteKey(JSON.stringify({"collection":"users"}))
    
}

// get user
exports.getUser = async(req, res) => {
    const user = await User.find();
    // console.log("all user" , user);
    res.json(user)
}

// get single User
exports.getSingleUser = async (req, res) =>{
    const user = await User.find({_id: req.params.id});
  
    res.json(user)
}



exports.fetchRepos = (req, res) => {
    // console.log(client);
    console.log(req.params.username);
    const data = axios.get(`https://api.github.com/users/${req.params.username}`);
    // console.log(data);
    data.then((response) => {
       
        client.set(req.params.username, response.data.public_repos, (err, val) => {
            if(err){
                console.log(err)
            }
            else{
                console.log(val);
            }
        })
        res.json({"from the server" : response.data.public_repos});
    }).catch((error) => {
        console.log(error);
    })
}


// test user photo
exports.user = (req, res) => {
    console.log(req.body);
    console.log(req.file)


    // res.json({"message": "data not found"})
}