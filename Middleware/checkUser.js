const userModel = require('./../models/user')

exports.checkUser = async(req,res,next) => {

    const { email } = req.body;
    console.log("here " + email);

    const userExist = await userModel.findOne({where: {user_email: email}});

    console.log("here only" );
    if(userExist == null){
      return res
        .status(statusCode.error)
        .send('No user exist with the given Email ID');
    }else{
        next();
    }
}