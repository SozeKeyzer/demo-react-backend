
const Sequelize=require('sequelize');
const sequelize=require('../database/connect');

const userModel=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING
    },
    age:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    email:{
        type:Sequelize.STRING,
    },
    admin:{
        type:Sequelize.BOOLEAN
    },
    password:{
        type:Sequelize.JSON
    }
});

module.exports=userModel;