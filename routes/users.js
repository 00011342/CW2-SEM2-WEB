const express = require('express')
const router = express.Router();
const fs = require('fs')
const path = require('path')
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const multer = require('multer');
const { json } = require('body-parser');
const validator = require("express-validator");

const root = path.dirname(
  require.main.filename || process.require.main.filename
);

// multer config
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, path.join(__dirname, '../public/images'));
  },
  filename: (req, file, cb) =>{
     cb(null, Id() + '.jpg');
  }
});

//array for db
let UserDb = []

// db folder
const Db = `${root}/data/users.json`;


/// gerenrate random ID for employees 
function Id() {
	return Math.floor(Math.random() * 99999999999) + 1;
}
  


// homepage for employees
router.get('/api/v1/users',(req,res)=>{
 
  res.render('index', {users:UserDb});
})



// create new user
router.get('/api/v1/users/new',(req,res)=>{

  res.render('addUser')
})


//multer use
router.use(multer({ storage:storageConfig }).single("image"));
// valdiation
const { body, validationResult } = require('express-validator');



router.post('/api/v1/users/new',body('name','email').isEmpty(), (req, res) => {

      const    name = req.body.name;
      const   email = req.body.email;
      const    gender =req.body.gender;
      const   status =req.body.status;
      const   image = req.file.filename;
 

// // Finds the validation errors in this request and wraps them in an object with handy functions
//  const errors = validationResult(req);
//     if (errors.isEmpty()) {
//       return res.render('addUser',{error:true})
      
//     }else{
//       fs.readFile(Db , (err, data)=>{
//       if (err) throw err 
      
//      res.render('addUser',{success:true})

//       UserDb=JSON.parse(data)
       
//       UserDb.push({
//         id: Id(),
//         name:name,
//         email:email,
//         gender:gender,
//         status:status,
//         image:image
//       })
    
//       fs.writeFile(Db, JSON.stringify(UserDb), (err) => {
//         if (err) res.sendStatus(400)
//          // res.render('addUser')
//       })
//     })
//     }
//   },
// );


   

 




// // read operation
// router.get('/api/v1/users/:id/view',(req,res)=>{

//   const id = req.params.id
//   fs.readFile(Db,(err,data)=>{
//       if (err) throw err
//       const users = JSON.parse(data)
//       const user = users.filter(user=> user.id ==id)[0]
//       res.render('update',{user:user})
//   })
// })



// delete 
router.get('/api/v1/users/:id/delete', (req,res)=>{
  const id = parseInt(req.params.id)
const index = UserDb.findIndex(user => user.id === id)


UserDb.splice(index, 1)

// Update 
fs.writeFile(Db, JSON.stringify(UserDb), (err) => {
  if (err) {
    res.redirect('/api/v1/users?success=0')
  } else {
    res.redirect('/api/v1/users?success=1')
  }
})
  
})




module.exports=router;