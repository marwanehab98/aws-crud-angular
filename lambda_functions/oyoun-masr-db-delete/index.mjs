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
    await dynamo.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          id: event.pathParameters.id,
        },
      }),
    );
    body = `Deleted item ${event.pathParameters.id}`;
  } catch (err) {
    statusCode = 400;
    body = `${err.message}`;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
