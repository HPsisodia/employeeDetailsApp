const express = require('express');
const router = express.Router();

const { protect } = require('./../controllers/authcontroller');


router.get('/dashboard', protect, (req,res) =>{
    
    if(req.user.user_role === 'customer'){
        res.render("customer-dashboard", {
            post: {
                name: req.user.user_name
            }
        });
    }else if(req.user.user_role === 'admin'){
        res.render("admin-dashboard");
    }else{
        res.send(req.user.role);
    }
    
});


module.exports = router;