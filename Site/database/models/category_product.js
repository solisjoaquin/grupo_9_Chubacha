'use strict';

const { static } = require('express');

const{
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
    class Category extends Model{

        static associate(models){

        }
    }

    Category.init({

        name: DataTypes.STRING,
    },{
        sequelize,
        modelName: 'Category',
        timestamps: false
    });
    return Category;

};