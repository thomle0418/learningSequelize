const router = require('express').Router();
const bcrypt= require('bcryptjs');
const User = require('../../../models/User');

router.post('/', async (req, res) => {
    const {
        username,
        email, 
        password,
        numberOfPets,
    }= req.body;

    if(!username || !email || !password){
        return res.status(400).json({error: `You must provide username, password, and email`})
    }

    try {
    

        const newUser = await User.create({
            username,
            email, 
            password,
            numberOfPets,
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
            },
            individualHooks: true,
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

router.post('/login', async (req, res) =>{
    const {email, password}= req.body;

    if(!email || !password){
        return res.status(400).json({error: `You must provide a valid email and password`});
    }
    try {
        const user = await User.findOne({
            where:{
                email,
            }
        });
        if(!user){
            return res.status(400).json({error: `No user with that email`});
        }
        const isMatchingPassword= await bcrypt.compare(password, user.password)
        if(!isMatchingPassword){
            return res.status(401).json({error:`Invalid Password`});
        }

        res.json({message: `you are not logged in.`});
    } catch (e) {
        res.json(e);
    }
});

//router for getting a user by their id and checking if they have a pet or not 
router.get('/hasPets/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if(!user) {
            return res.status(404).json({error: `User not found`});
        }

        const doesHavePets = user.hasPets();

        if(!doesHavePets){
            return res.status(400),json({message: `User has no pets`});
        }
        res.json({message: `User does have pets`});
    } catch (e) {
        res.json(e);
    }
})
module.exports = router;