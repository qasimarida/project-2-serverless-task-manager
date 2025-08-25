const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const { taskId, description } = body;

    const params = {
        TableName: 'Tasks',
        Item: {
            taskId: taskId,
            description: description,
            createdAt: new Date().toISOString()
        }
    };

    try {
        await dynamo.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Task created successfully!' })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create task', details: err.message })
        };
    }
};
j