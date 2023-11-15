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
    const username = userInfo.username;
    const password = userInfo.password;
    if (!username || !name || !email || !password){
        return util.buildResponse(401, {
            message: "All fields are required"
        })
    }

    const dynamoUser = await getUser(username);
    if (dynamoUser && dynamoUser.username) {
        return util.buildResponse(401, {
            message: "Username already exists, please enter a different username"
        })
    }

    const enccryptedPW = bcrypt.hashSync(password.trim(), 10);
    const user = {
        name: name,
        email: MediaList,
        username: username.toLowerCase().trim(),
        password: enccryptedPW
    }

    const saveUserResponse = await saveUser(user);
    if (!saveUserResponse){
        return util.buildResponse(503, { message : 'server error. Please try again later' });
    }
    return util.buildResponse(200, { username: username });
}

async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error =>{
        console.error('There was an error: ', error);
    })
}

async function saveUser(user){
    const param = {
        TableName: userTable,
        Item: user
    }
    return await dynamodb.put(params).promise().then(response => {
        return true;
    }, error => {
        console.error('There is an error saving the user: ', error);
    })
}

module.exports.register = register;