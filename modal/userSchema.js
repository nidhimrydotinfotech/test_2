const {Schema, model} =  require("mongoose");

const userSchema = new Schema({
    firstName: String,
    lastName:String
})

const User = model("User", userSchema);

module.exports = User;