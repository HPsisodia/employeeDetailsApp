const { promisify } = require('util');
const userModel = require('../models/user'); 
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

require("dotenv").config();

const ENV = 'development';
const {
    statusCode,
    returnErrorJsonResponse,
    returnJsonResponse,
  } = require("../Helpers/status.js");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signToken = (email, role) =>{
    return jwt.sign({email: email, role: role}, process.env.SECRET_KEY, {
        expiresIn: "1d"
    });
}

const createSendToken = (user, res) =>{
  
  const token = signToken(user.user_email, user.user_role);

  const cookieOptions = {
    expires: new Date(Date.now() + 90*24*60*60*1000 ),
    httpOnly: true
  }

  if(ENV === 'production') cookieOptions.secure = true;
  return res.cookie('jwt', token, cookieOptions);
  
  //res.redirect('/dashboard');
  
}


exports.registration = async(req,res) => {
    try {
      
      if(req.user.upload == false){
        return res.render("wrongType. Use only JPEG file")
      }
      const { name, email, password, role, totalorder } = req.body;

      const userExist = await userModel.findOne({where: {user_email: email}});

      if(userExist != null){
        return res
              .status(statusCode.error)
              .render('User Already Exist. Please use different Email ID');
      }

      const salt = await bcrypt.genSalt(13);
      const hashedPassword = await bcrypt.hash(password, salt);
      const d = moment().format();
      //console.log(d + " " + typeof(d));

        const newUser = {
          user_id: uuidv4(),
          user_name: name,
          user_email: email,
          user_password: hashedPassword,
          user_role: role,
          user_image: req.user.picName,
          total_orders: totalorder,
          created_at: d,
          last_logged_in: d
        }

        const user = await userModel.create(newUser);
        

        const token = signToken(newUser.user_email, newUser.user_role);
        if(user){
            res.set( {
                'token': token
            });
            //console.log(token);
            res.redirect('/details')
        }else{
            return res
            .status(statusCode.bad)
            .json(
              returnErrorJsonResponse(
                statusCode.bad,
                "fail",
                "Something went wrong, couldnt save user. Check internet connection",
                error
              )
            );            
        }
        


    } catch (error) {
        return res
        .status(statusCode.bad)
        .json(
          returnErrorJsonResponse(
            statusCode.bad,
            "fail",
            "Something went wrong, Please try again 11",
            error
          )
        );        
    }
}


exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;
        //const user = await registrationModel.find({email: email}).select('+password');

        const user = await userModel.findOne({where: {user_email: email}});

        //console.log( (user == null) + " " + await bcrypt.compare(password, user.user_password));

        if(user == null || !(await bcrypt.compare(password, user.user_password))){
            return res.render("404login")       
        }

        ///send token
        createSendToken(user, res);

        const curentTime = moment().format();
        const updateLoginTime = userModel.update({last_logged_in: curentTime}, 
                                                  {
                                                    where: {
                                                      user_email: email
                                                    }
                                                  })
        // const token = signToken(user[0].email, user[0].role);
        // console.log(token);

        return res.redirect('/dashboard');
        // return res
        // .status(statusCode.success)
        // .json(
        //     returnJsonResponse(
        //     statusCode.success,
        //     "success",
        //     "Logged in",
        //     token
        //   )
        // );
    } catch (error) {
        return res.render("404login")        
    }
}


exports.protect = async (req,res,next) => {
  try{
    let token;

    if(req.cookies.jwt){
      token = req.cookies.jwt;
    }

    if(token === "loggedout"){
      return res.render("pleaselogin");
    }
    if(!token){
      return res
      .status(statusCode.unauthorized)
      .json(
        returnErrorJsonResponse(
          statusCode.unauthorized,
          "fail",
          "Not logged in",
          error
        )
      );
    }

    //verify
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

    ///check if user exits
    const freshUser = await userModel.findOne({where : {user_email: decoded.email}});
    if(freshUser == null){
      return res
      .status(statusCode.unauthorized)
      .json(
        returnErrorJsonResponse(
          statusCode.unauthorized,
          "fail",
          "User Doesnt exist anymore",
          error
        )
      );      
    }

    ////Grant Access
    req.user = freshUser;
    next();
  }catch{
    return res
    .status(statusCode.bad)
    .json(
      returnErrorJsonResponse(
        statusCode.bad,
        "fail",
        "Something went wrong, Please try again",
        error
      )
    );
  }
}

exports.restrictTo = (...roles) =>{
  return (req,res,next) =>{
    if(!roles.includes(req.user.user_role)) {
      return res.render("notallowed");      
    }
    next();
  };
};
