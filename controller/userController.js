const userModel = require('../models/userModel');
const refreshTokenModel = require('../models/refreshTokenModel');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const mailer = require('../util/mailer');

module.exports = {

    registerUser: async (req, res) => {
        const {
            name,
            age,
            email,
            password,
            admin
        } = req.body;
        await userModel.create({
            name,
            age,
            email,
            password,
            admin
        });
        res.json("user added");
    },
    login: async (req, res) => {
        const {
            email,
            password
        } = req.body;
        //if user is not found it returns null we can check using if(user)
        const user = await userModel.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            if (user.password == password) {
                //generate an access token
                const accessToken = jwt.sign({
                        id: user.id,
                        isAdmin: user.admin
                    },
                    process.env.SECRECT_KEY, {
                        expiresIn: "15m"
                    }
                );
                //generate a refresh token
                const refreshToken = jwt.sign({
                        id: user.id,
                        isAdmin: user.admin
                    },
                    process.env.REFRESH_SECRECT_KEY
                );
                //add refresh token to db
                await refreshTokenModel.create({
                    refreshToken
                });
                //send the response with access token to client
                res.json({
                    username: user.name,
                    isAdmin: user.admin,
                    accessToken,
                    refreshToken
                });
            } else {
                res.status(400).json("incorrect password");
            }
        } else {
            res.status(400).json("user not found");
        }
    },
    home: (req, res) => {
        res.json('this is home');
    },
    refreshToken: async (req, res) => {
        //take the refresh token from the user
        const refreshToken = req.body.token;
        //send the error to the user if there is no token or its invalid
        if (!refreshToken) return res.status(401).json("you are not authenticated");
        const rToken = await refreshTokenModel.findOne({
            where: {
                refreshToken: refreshToken
            }
        });
        if (!rToken||rToken.refreshToken != refreshToken) {
            return res.status(403).json("refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.REFRESH_SECRECT_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokenModel.destroy({
                where: {
                   refreshToken: refreshToken
                }
            }).then(data => {

            });
            const newAccessToken = jwt.sign({
                    id: user.id,
                    isAdmin: user.admin
                },
                process.env.SECRECT_KEY, {
                    expiresIn: "15m"
                }
            );
            const newRefreshToken = jwt.sign({
                    id: user.id,
                    isAdmin: user.admin
                },
                process.env.REFRESH_SECRECT_KEY
            );
            refreshTokenModel.create({
                refreshToken
            }).then(data=>{
                
            });
            res.status(200).json({
                accessToken:newAccessToken,
                refreshToken:newRefreshToken
            });
        });
        //if eveything is okay create new access token and refresh token and send to user
    },
    logout:async (req,res)=>{
        const refreshToken=req.body.token;
        await refreshTokenModel.destroy({
            where:{
                refreshToken:refreshToken
            }
        });
        res.status(200).json("you have logged out");
    }

};