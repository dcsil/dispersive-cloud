// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const randomBytes = require('crypto').randomBytes;
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putItemHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const body = event.body;
    const id = toUrlString(randomBytes(16));
    const username = body.username;
    const createTime = new Date().toISOString();
    const ip = body.ip;
    const startPosition=JSON.stringify(body.startPosition)
    const endPosition=JSON.stringify(body.endPosition)

    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    var params = {
        TableName : tableName,
        Item: { 
            id : id, 
            username: username ,
            createTime:createTime,
            ip:ip,
            startPosition:startPosition,
            endPosition:endPosition
        }
    };

    const result = await docClient.put(params).promise();

    const response = {
        statusCode: 200,
        body: body,
         headers: {
      'Access-Control-Allow-Origin': '*',
    },
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}


function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}