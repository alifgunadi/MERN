const { getToken, policyFor } = require('../utils/index');
const config = require('../app/config');
const Users = require('../app/user/model');
const jwt = require('jsonwebtoken');


function decodeToken () {
    return async function (req, res, next) {
        console.log("CHECK JWT")
        try {
            const token = getToken(req);
            if (!token) {
                return next()
            };

            const decodedToken = jwt.verify(token, config.secretKey)
            req.user = decodedToken;

            const user = await Users.findOne({token: {$in: [token]}});
            req.user = user;
            console.log("before next")
            next(); 
            
        } catch (error) {
            console.log("error")
            next(error);
        };
    }
};

// function police_check (action, subject) {
//     // console.log(action, subject);
//     return async function(req, res, next) {
//         let policy = policyFor(req.user);
//         // console.log(policy);
//         if (!policy.can(action, subject)) {
//             res.json({
//                 error: 1,
//                 message: `You are not allowed to ${action} the ${subject}`
//             })
//         }
//         next();
//     }
// };

module.exports = {
    decodeToken,
    // police_check,
}