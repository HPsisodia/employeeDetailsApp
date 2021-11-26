const express = require('express');

const router = express.Router();

const multer = require('multer');


const { getDetails, getSingleCustomer, updateCustomer, getCustomerImage, deleteCustomer } = require('./../controllers/details');
const {registration, protect, restrictTo} = require('./../controllers/authcontroller')

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

router.get('/get-details', getDetails);

router.get('/details', (req,res) =>{
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .render("listCustomerDetails");
});

router.get('/details/:id', getSingleCustomer);

router.get('/update',protect, restrictTo('admin'), (req,res) =>{
  res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .render("updateCustomer");
})

router.post('/update', protect, restrictTo('admin'), upload.single("file"), updateCustomer);

router.get('/image/:id', getCustomerImage);

router.post('/insert', protect, restrictTo('admin'), upload.single("file"), registration);
router.get('/insert', protect, restrictTo('admin'), (req,res) =>{
    res.render("insertuser");
});

router.delete('/delete/:id', deleteCustomer);



module.exports = router;