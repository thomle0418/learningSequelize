const {UUIDV4, Model, DataTypes} = require('sequelize');
const sequelize = require('../config'); 

class Todo extends Model {}

Todo.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },

        task:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        //This column will store a reference of the 'id' of the 'user that this todo belongs to
        authorId:{
            type: DataTypes.UUID,
        //This will create the connection between todo and user
        },
        reference:{
            model: 'User',
        //specify to sequelize which column in the User table does this data refer to
        key: 'id',    
        },
    },

    {
        sequelize,
        timestamps: false,
        freezeTablename : true,
        modelName: 'Todo',

    }
);

module.exports=Todo;