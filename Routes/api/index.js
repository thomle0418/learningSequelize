const router = require('express').Router();
const bookRoutes= require('./bookRoutes');
const userRoutes= require('./userRoutes');
const todoRoutes = require('./todoRoutes');

// Every route inside of this index.js
// already has /api prepended befor it 

//this will prepend /api/books to every route delcared below this comment 

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/todos', todoRoutes);
module.exports= router;