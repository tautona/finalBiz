const multer = require('multer');
const User = require('../models/userModel');

// configure disk storage for files handled by multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/img');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

class UserService
{
  //LIST
  static list(){
    console.log("no chance");
    return User.find({})
    .then((users)=>{
      return users;
    });
  }
  //findOne
  static find(id){
    return User.findById(id)
     .then((user)=>{
       return user;
     });
  }
  //creeate
  static create(obj){
    var user = new User(obj);
    console.log("from controller " + user._id);
    return user.save();
    //return user;
  }
  //updateUser
  static update(id, data){
    return User.findById(id)
      .then((user)=>{
        user.set(data);
        user.save();
        return user;
      });
  }
  //DELETE
  static delete(id){
    console.log("in delete " + id);
    return User.deleteOne({_id: id})
      .then((obj)=>{
        return obj;
      });
  }

}

module.exports.storage = storage;

module.exports.UserService = UserService;
