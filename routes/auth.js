const express = require('express');
const router = express.Router();
const multer = require('multer');

const { registration, login } = require("./../controllers/authcontroller");

const multerStorage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const name = `user-${req.body.email}-profile.${ext}`
        cb(null, name);
        req.user = {};
        req.user.picName = name;
    }
});

const upload  = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          req.user.upload = false;
        }
      }
});

//router.post('/', upload.single("file"), registration);
router.get('/', (req,res) =>{
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10*1000 ),
    httpOnly: true
  });
    res.render("register");
});

router.post('/login', login);

router.get('/login', (req,res) =>{
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10*1000 ),
        httpOnly: true
      });
    return res.render("login");
});

router.get('/login-customer', (req,res) =>{
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10*1000 ),
        httpOnly: true
      });
    return res.render("login-customer");
});


module.exports = router;