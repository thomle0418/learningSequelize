const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config');

//Declares a class called book and inherits
//all the prototype methods that are in the model class
class Book extends Model {}
//creates book class- will then inherit queries from sequlized objects

Book.init({
    //declares columns for this table
    //by default sequelize creates the id column for us
title: {
    type: DataTypes.STRING,
},
author: {
    type: DataTypes.STRING,
},
isbn: {
    type: DataTypes.STRING,
},
pages:{
    type: DataTypes.INTEGER,
},
edition:{
    type: DataTypes.INTEGER,
},
isPaperback:{
    type: DataTypes.BOOLEAN,
},

},

{
//which database connection should this table be created in
sequelize,
//by default sequelize will create 2 columns for our table
//created_at and updated_at are
timestamps: false,
modelName: 'book',
}); 

module.exports= Book;