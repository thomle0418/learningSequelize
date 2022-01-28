const router = require('express').Router();
const { Todo, User,} = require('../../../models');


router.get('/', async(req, res)=>{
    try {
        const todos = await Todo.findAll({
            //will perform a join with the user table
            include: [{model: User}],
        });
        res.json(todos);
    } catch (e) {
        res.json(e);
    }
});

module.exports = router;