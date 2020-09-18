'use strict';


const{
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
    class User extends Model{

        static associate(models){

        }
    }

    User.init({
        name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        avatar: DataTypes.STRING,
        category_id: DataTypes.INTEGER
    },{
        sequelize,
        modelName: 'User',
        timestamps: false
    });
    return User;

};