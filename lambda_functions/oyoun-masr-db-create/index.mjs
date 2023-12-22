import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = 'oyoun-masr-data';

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    let requestJSON = JSON.parse(event.body);
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          id: requestJSON.id,
          price: requestJSON.price,
          name: requestJSON.name,
        },
      }),
    );
    body = requestJSON;
  } catch (err) {
    statusCode = 400;
    body = `Cannot put item because ${err.message}`;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
