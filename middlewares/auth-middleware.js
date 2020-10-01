'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Authenticate middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function AuthMiddleware(req, res, next) {
    // get the authorization header
    const { authorization } = req.headers;

    // if not available return failure response
    if (!authorization) {
        return res.status(401).json({
            "message": "Unauthenticated!"
        });
    }

    // get token from header
    const [, token] = authorization.split(" ");

    // try decoding the token
    try {
        const userData = await jwt.verify(token, process.env.APP_KEY);
        const user = await User.findById(userData.id);

        // if cannot find user return unauthenticated
        if (!user) {
            return res.status(401).json({
                "message": "Unauthenticated!"
            });
        }

        // add user to request
        req.user = user;

        // perform next request
        return next();
    } catch (error) {
        // return unauthenticated
        return res.status(401).json({
            "message": "Unauthenticated!"
        });
    }
}

module.exports = AuthMiddleware;