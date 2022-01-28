const User = require('./User');
const Todo = require('./Todo');

//Define a user as having many Todos to create a foreign key in the "Todo" table
User.hasMany(Todo, {
foreignKey: 'authorId',
onDelete: 'CASCADE',
});

// Define an association that a Todo belings to one User

Todo.belongsTo(User, {
    foreignKey: 'authorId',
})


module.exports= {
    User,
    Todo,
};