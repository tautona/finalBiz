const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../../controllers/userController');
const upload = multer({
  storage: userController.storage
});
const UserService = userController.UserService;

// take care of cors matters
router.use((req, res, next)=>{
  res.set({
   'Access-Control-Allow-Origin':'*',
   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
   'Access-Control-Allow-Headers':"Content-Type, Access-Control-Allow-Headers",
   'Content-type':'application/json'
  });
  if (req.method == 'OPTIONS'){
    return res.status(200).end();
  }
 next();
})


//List users (returnded in an array)
router.get('/',(req,res,next)=>{
  UserService.list()
    .then((users)=>{
    //  console.log("oh my oh my");
      console.log(`found users  ${users}`);
      res.status(200);
      res.set({'Content-type':'application/json'});
      res.json(users);
    })
})

//  users/:userid    FIND user

router.get('/:userid', (req,res,next)=>{
  UserService.find(req.params.userid)
  .then((user)=>{
    console.log(`found one ${user}`);
    res.status(200);
    res.set({'Content-type':'application/json'});
    //res.send(JSON.stringify(user));
    res.json(user);
  }).catch((err)=>{
  });
});

//  /users    POST    (create a new user)
router.post('/', upload.single('user'), async (req, res, next)=>{
  var user  = {
    username: req.body.username,
    firstUnit: req.body.firstUnit,
    secondUnit: req.body.secondUnit
  }
  try{
    const userSave = await UserService.create(user);
    res.status(201);
    res.set({"Content-type":'application/json'});
    res.send(JSON.stringify(user));
  }catch(err){
    console.log(err);
    throw new Error("UserSaveError", user);//fix later
  }
});

// /users/:userid PUT  update
router.put('/:userid',(req,res,next)=>{
  console.log(`putting ${req.params.userid}`);
  let putdata = req.body;
  UserService.update(req.params.userid, putdata)
  .then((updateUser)=>{
    res.status(200);
    res.send(JSON.stringify(updateUser));
  }).catch((err)=>{
    res.status(404);
    res.end();
  });
});

//  users/userid   DELETE   (update a user)
router.delete('/:userid',(req,res,next)=>{
  UserService.delete(req.params.userid)
  .then((user)=>{
    console.log(`Found users: ${user}`);
    res.status(200);
    res.send(JSON.stringify(user));
  }).catch((err)=>{
    res.status(404);
    res.end();
  });
});

module.exports = router;
