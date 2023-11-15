const util = require('../utils/util');
const auth = require('../utils/auth');

function verify(requestBody){
    if (!requestBody.user || !requestBody.user.user_name || !requestBody.token){
        return util.buildResponse(401, {
            verified: false,
            message: 'Invalid request body'
        })
    }

    const user = requestBody.user;
    const token = requestBody.token;
    const verifications = auth.verifyToken(user.user_name, token);

    if (!verifications.verified) {
        return util.buildResponse(401, verifications);
    }
    return util.buildResponse(200, {
        verified: true,
        message: 'Verification successful',
        user: user,
        token: token
    })
}

module.exports.verify = verify;