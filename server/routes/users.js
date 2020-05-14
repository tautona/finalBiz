//users.js
const express = require('express');
const router = express.Router();
const app = express();
const multer = require('multer');
var User = require('../models/userModel');

const userController = require('../controllers/userController');
const upload = multer({
  storage: userController.storage,

});
const flash = require('express-flash');
const UserService = userController.UserService;
router.use(flash());

// list users -

router.get('/', (req, res, next)=>{
  UserService.list()//User.find({})
  .then((users)=>{
    res.render('users', {
      users : users,
      flashMsg: req.flash("fileUploadError")
    });
  })
  .catch((err)=>{
    if(err) {
    res.end("ERROR! in users.js!")
    }
  });
});


// remove a user with a particulkar userid from the database

router.get('/delete/:userid', (req,res,next)=>{
  User.findOne({'_id': req.params.userid})
    .then((user)=>{
      user.remove(function(err) {
      });
    res.redirect('/users');
    });
});


// retrieve a particular user from the database (based on userid)

router.get('/:userid', (req,res,next)=>{
    console.log("finding " +req.params.userid);
    User.findOne({'_id': req.params.userid})
      .then((user)=>{
        res.render('updateUser', {
          user:user,
          flashMsg: req.flash("userFindError")
        });
      }).catch((err)=>{
        if(err) console.log(err);
      });
});
//  update a particular user
router.post('/:userid', (req,res,next)=>{
    //console.log("finding " +req.params.userid);
    User.findOne({'_id': req.params.userid})
      .then((user)=>{
        var data = {
          username:req.body.username,
          firstUnit: req.body.firstUnit,
          secondUnit: req.body.secondUnit
        }
        user.set(data);
        user.save().then(()=>{
          res.redirect('/users');
        });
      }).catch((err)=>{
        if (err) console.log(err);
      });
});

//  creeate a new user
router.post('/', upload.single('user'), (req, res, next)=>{
  var user  = {
    username: req.body.username,
    firstUnit: req.body.firstUnit,
    secondUnit: req.body.secondUnit
  }
  var user = new User(user);
  user.save()
    .then(()=> {
      res.redirect('/users');
    })
    .catch((err)=>{
      if(err){
        console.log(err);
        throw new Error("SaveError",user);
      }
    });

});
// fine, errors need handling
router.use(function(err, req, res, next){
  console.error(err.stack);
  if (err.message == "OnlyImageFilesAllowed"){
    req.flash('fileUploadError', "PLease selecet  a proprer file");
    req.redirect('/users');
  } else if (err.message == "SaveError"){
    req.flash('saveError', "There was some problem");
    res.redirect('/users');
  }else{
    next(err);
  }
})
module.exports = router;
