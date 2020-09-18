'use strict';

const { static } = require('express');

const{
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
    class CategoryUser extends Model{

        static associate(models){

        }
    }

    CategoryUser.init({
        name: DataTypes.STRING,
    },{
        sequelize,
        modelName: 'CategoryUser',
        timestamps: false
    });
    return CategoryUser;

};