const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
})
const util = require('../utils/util');
const bcrypt = require('bcryptjs');


const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable =  'stable_diff_users';

async function register(userInfo){
    const name = userInfo.name;
    const email = userInfo.email;
    const user_name = userInfo.user_name;
    const password = userInfo.password;
    if (!user_name || !name || !email || !password){
        return util.buildResponse(401, {
            message: "All fields are required"
        })
    }

    const dynamoUser = await getUser(user_name);
    if (dynamoUser && dynamoUser.user_name) {
        return util.buildResponse(401, {
            message: "Username already exists, please enter a different username"
        })
    }

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    const user = {
        name: name,
        email: email,
        user_name: user_name.toLowerCase().trim(),
        password: encryptedPW
    }

    const saveUserResponse = await saveUser(user);
    if (!saveUserResponse){
        return util.buildResponse(503, { message : 'Server error. Please try again later' });
    }
    return util.buildResponse(200, { user_name: user_name });
}

async function getUser(user_name) {
    const params = {
        TableName: userTable,
        Key: {
            user_name: user_name
        }
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error =>{
        console.error('There was an error: ', error);
    })
}

async function saveUser(user){
    const params = {
        TableName: userTable,
        Item: user
    }
    try {
        await dynamodb.put(params).promise();
        return true;
    }
    catch (error) {
        console.error('There was an error: ', error);
        throw error;
    }
}

module.exports.register = register;