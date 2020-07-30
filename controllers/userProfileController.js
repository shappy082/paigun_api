const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/index')
//const User = require("../models/userFaceModel")
const User = require("../models/userProfileModel")

exports.signup = async (req, res, next) => {
    try {
        const { username, password, userid, name, role, roledesc } = req.body;
        console.log(`username: ${username} \nuser_id: ${userid} \npassword: ${password} \nname: ${name} \nrole: ${role} \nroledesc: ${roledesc}`)
        //const user = await User.find()
        const user  = await User.findOne({ "username": username });

        if (!user) {
            console.log("begib loop")
            let user = new User();
            user.username = username;
            user.userid = userid;
            user.password = password;
            user.name = name;
            user.role = role;
            user.roledesc = roledesc;

            await user.save();
            console.log("end loop")
            //const error = new Error('Username already exits');
            //error.statusCode = 400;
            //throw error;
        }

        //let user = new User();
        //user.username = username;
        //user.user_id = user_id;
        //user.password = await user.encryptPassword(password);

        //await user.save();

        
        console.log("found:", user)
        // if (!user) {
        //     const error = new Error('Authentication Failed, User not found');
        //     error.statusCode = 404;
        //     throw error;
        // }
        // console.log("password" + password)
        // console.log("user.password" + user)

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        next(error);
    }
}

