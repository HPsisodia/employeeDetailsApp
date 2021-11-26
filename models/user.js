const Sequelize = require("sequelize");
const moment = require('moment');


var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        timestamps: false,
        freezeTableName: true
    }
}

const sequelize = new Sequelize(process.env.URL, opts);

const User = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER(),
        autoIncrement: true
    },

    user_id: {
        type: Sequelize.STRING(256),
        primaryKey: true,
    },

    user_name: {
        type: Sequelize.STRING(128),
    },

    user_email: {
        type: Sequelize.STRING(40)
    },

    user_password: {
        type: Sequelize.STRING(256)
    },

    user_role: {
        type: Sequelize.STRING(15)
    },

    user_image: {
        type: Sequelize.STRING(100)
    },

    total_orders: {
        type: Sequelize.INTEGER()
    },

    created_at: { 
        type: Sequelize.STRING(40),  
   },

    last_logged_in: {
        type: Sequelize.STRING(40)
    }
});

User.sync({force: false})

module.exports = User;