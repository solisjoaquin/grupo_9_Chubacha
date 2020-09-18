'use strict';

const { static } = require('express');

const{
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
    class Product extends Model{

        static associate(models){

        }
    }

    Product.init({
        name: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        price: DataTypes.FLOAT,
        imagen: DataTypes.STRING,
        category_id: DataTypes.INTEGER
    },{
        sequelize,
        modelName: 'Product',
        timestamps: false
    });
    return Product;

};