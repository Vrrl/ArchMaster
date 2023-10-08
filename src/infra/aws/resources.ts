import type { AWS } from '@serverless/typescript';

const resources: AWS['resources'] = {
  Resources: {
    ChallengesTable: {
      Type: 'AWS::DynamoDB::Table',
      DeletionPolicy: 'Retain',
      Properties: {
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
        ],
        BillingMode: 'PAY_PER_REQUEST',
        TableName: '${self:provider.environment.DYNAMO_CHALLENGES_TABLE}',
      },
    },
    CognitoUserPool: {
      Type: 'AWS::Cognito::UserPool',
      DeletionPolicy: 'Retain',
      Properties: {
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
        ],
        BillingMode: 'PAY_PER_REQUEST',
        TableName: '${self:provider.environment.DYNAMO_CHALLENGES_TABLE}',
      },
    },
  },
};

export default resources;
