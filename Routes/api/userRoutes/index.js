const router = require('express').Router();
const User = require('../../../models/User');

router.post('/', async (req, res) => {
    const {
        username,
        email, 
        password,
    }= req.body;

    if(!username || !email || !password){
        return res.status(400).json({error: `You must provide username, password, and email`})
    }

    try {
        const newUser = await User.create({
            username,
            email, 
            password,
        });
        res.json(newUser);
    } catch (e) {
        console.log(e)
        res.json(e);
    }
});

router.get('/', async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        res.json(user);
    } catch (e) {
        res.json(e);
    }
});

router.patch('/:userId', async (req, res) => {
    const{
        username,
        email,
        password,
    }= req.body;
    try {
        await User.update(
            {
                username,
                email,
                password,
            },
            {
            where: {
                id: req.params.userId,
            }
        }   
    );
        const user = await User.findByPk(req.params.userId);
        res.json(user);
    } catch (e) {
        res.json(e);
    }
});

router.delete('/:userId', async function(req, res) {
try {
    const deleteUser= await User.findByPk(req.params.userId);
    await User.destroy({
        where:{
            id: req.params.userId,
        }
    });
    res.json(deleteUser);
} catch (e) {
res.json(e);
}
});

module.exports = router;