const userModel = require('../models/user'); 

const {
    statusCode,
    returnErrorJsonResponse,
    returnJsonResponse,
  } = require('./../Helpers/status')





exports.getDetails = async (req,res) => {
    try {
        const users = await userModel.findAll({where: {user_role: 'customer'}});
        return res
            .status(statusCode.success)
            .json(
                returnJsonResponse(
                statusCode.success,
                "success",
                "Details of Customers",
                users
              )
            );        
    } catch (error) {
        return res
        .status(statusCode.bad)
        .json(
          returnErrorJsonResponse(
            statusCode.bad,
            "fail",
            "Something went wrong, Couldnt fetch clinic",
            error
          )
        );        
    }        
}

exports.getSingleCustomer = async(req,res) => {
  try {

    const id = req.params.id;
    const singleUser = await userModel.findOne({where: {user_id: id}});
    //const user = [singleUser];
    return res
        .status(statusCode.success)
        .render('singleCustomer', {
          post: {
            id: singleUser.user_id,
            name: singleUser.user_name,
            email: singleUser.user_email,
            total_orders: singleUser.total_orders,
            last_logged_in: singleUser.last_logged_in
          }
        });        
} catch (error) {
    return res
    .status(statusCode.bad)
    .json(
      returnErrorJsonResponse(
        statusCode.bad,
        "fail",
        "Something went wrong, Couldnt fetch clinic",
        error
      )
    );        
}
}


exports.updateCustomer = async (req,res) => {
  try {

    const {name, email, totalorder } = req.body;

    if(req.user.upload == false){
      return res.render("wrongType. Use only JPEG File")
    }

    const picName = req.user.picName;


    const user = await userModel.update({user_name: name, user_email: email, total_orders: totalorder, user_image: picName},
                                  {where: 
                                    {user_email: email}
                                  });

    if(user){
      return res
        .status(statusCode.success)
        .json(
          returnJsonResponse(
          statusCode.success,
          "success",
          "Details of Customer Updated",
        
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
          "Something went wrong, Couldnt fetch clinic",
          error
        )
      );        
  }        
}


exports.getCustomerImage = async(req,res) => {
  try {

    const id = req.params.id;
    const singleUser = await userModel.findOne({where: {user_id: id}});
    //const user = [singleUser];
    const image = singleUser.user_image
    return res
        .status(statusCode.success)
        .render('seeimage', {
          post: {
            image: image
          }
        });        
} catch (error) {
    return res
    .status(statusCode.bad)
    .json(
      returnErrorJsonResponse(
        statusCode.bad,
        "fail",
        "Something went wrong, Couldnt fetch clinic",
        error
      )
    );        
}
}

exports.deleteCustomer = async(req,res) => {
  try {

    const id = req.params.id;
    const singleUser = await userModel.destroy({where: {user_id: id}});
    //const user = [singleUser];
    if(singleUser){
      return res
      .status(statusCode.success)
      .send("User/Customer Deleted succesfully");
    }
            
} catch (error) {
    return res
    .status(statusCode.bad)
    .json(
      returnErrorJsonResponse(
        statusCode.bad,
        "fail",
        "Something went wrong, Couldnt fetch clinic",
        error
      )
    );        
}
}