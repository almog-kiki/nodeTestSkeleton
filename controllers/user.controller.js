const UserModel = require('../models/user.model')
const axios = require('axios');

exports.find = async function (req, res){
    try{
        const users = await UserModel.find();
        res.json(users)
    }catch(err){
        res.status(500)
    }   
}

exports.getUser = async function (req, res){
    try{
        const result =  await axios.get(`https://api.github.com/users/${req.params.username}`)
        res.json(result.data)
    } 
    catch(error){
        console.log(error)
        res.status(500)
    }   
};