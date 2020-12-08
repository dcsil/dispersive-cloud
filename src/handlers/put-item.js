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
  console.info('received:', event);

  // All log statements are written to CloudWatch


  // Get id and name from the body of the request
  const body = event;
  const id = body.username;
  const username = body.username;
  const createTime = new Date().toISOString();
  const ip = body.ip;

  const startPosition = body.startPosition;
  const x0 = startPosition.x;
  const y0 = startPosition.y;

  const movePosition = body.movePosition;
  const x1 = movePosition.x;
  const y1 = movePosition.y;

  const endPosition = body.endPosition;
  const x2 = endPosition.x;
  const y2 = endPosition.y;

  const direction = radsToDegrees(Math.atan((y0 - y1) / (x0 - x1)))
  const angle_of_Curvature = radsToDegrees(Math.acos(((((x0 - x1) ^ 2 + (y0 - y1) ^ 2) ^ (1 / 2)) ^ 2 + (((x1 - x2) ^ 2 + (y1 - y2) ^ 2) ^ (1 / 3)) ^ 2 - (((x0 - x2) ^ 2 + (y0 - y2) ^ 2) ^ (1 / 4)) ^ 2) / (2 * (((x0 - x1) ^ 2 + (y0 - y1) ^ 2) ^ (1 / 2)) * (((x1 - x2) ^ 2 + (y1 - y2) ^ 2) ^ (1 / 3)))))
  const curvature_Distance = (Math.abs((y2 - y1) * x0 + (x1 - x2) * y0 + ((x2 * y1) - (x1 * y2)))) / (Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x1 - x2, 2)));
  // Creates a new item, or replaces an old item with a new item
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property

  const data = await docClient.get({ TableName: tableName, Key: { id: id } }).promise();
  const item = data.Item;
  console.info(`item==============${JSON.stringify(item)}`)
  let result = null;
  let params = null;
  let list = {
    id: id,
    createTime: createTime,
    username: username,
    ip: '127.0.0.1',
    errorIp: '',
    success: [],
    error: []
  };
  const targetData = {
    createTime: new Date().toISOString(),
    Direction: direction,
    Angle_of_Curvature: angle_of_Curvature,
    Curvature_Distance: curvature_Distance
  }
  if (item) {
     list = JSON.parse(JSON.stringify(item));
      list.errorIp = ip;
      list.error.unshift(targetData);
  }
   params = {
      TableName: tableName,
      Item: list
    };
    result = await docClient.put(params).promise();

 console.info(`result==============${result}`)
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Access-Control-Request-Headers, Access-Control-Request-Method, Authorization, X-Requested-With, User-Agent, Referer, Origin",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Max-Age": 1728000
    },
    body: body
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


function radsToDegrees(rad) {
  return (rad * 180.0) / Math.PI;
}


function deleteRecordById(id) {
    let params = {
        TableName: tableName,
        Key:{
              "id": id
        }
    }

    return docClient.delete(params,(err, data)=>{
          if (err) console.info(err);
          else console.info(data);
      })
}

