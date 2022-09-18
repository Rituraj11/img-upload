const bcrypt = require('bcrypt');
const joi = require('joi');

const User = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { error } = validateRegister(req.body);
        if (error) return res.status(400).send({errMessage:error.details[0].message});

        const salt = await bcrypt.genSalt(Number(process.env.SALT));

        const { name, email, password } = req.body;


        const userExists = await User.findOne({ email: email });
        if(userExists){
            return res.status(400).send({errMessage: 'User Exists. Please login'})
        }


        const hashedPassword = await bcrypt.hash(password, salt);

        const createUser = new User ({  
            name,
            email,
            password: hashedPassword,
        });

        await createUser.save();
        
        return res.status(201).send({message: 'User Created'})

    } catch (error) {
        console.log(error);
        res.send({errMessage: error});
    }
}

const login = async (req, res) => {
    try{

        console.log(req.body)
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { username, password } = req.body;

        const alreadyUser = await User.findOne({ email: username })

        if(!alreadyUser){
            return res.status(404).send({message: "user doesnot exists"})
        }

        const hashedPassword = alreadyUser.password;
        const matched = await bcrypt.compare(password, hashedPassword)

        if(!matched){
            return res.status(404).send({message:"Email/Password doesnot match"})
        }

        return res.status(200).send({message: 'User Logged in'});

    }catch(error){
        console.log(error);
        res.send({message: error});
    }
}


const validateLogin = (user) => {
    const schema = joi.object({
        username: joi.string().email().required(),
        password: joi.string().required(),
    });
    return schema.validate(user);
};

const validateRegister = (user) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = { register, login};