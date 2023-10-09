import type { AWS } from '@serverless/typescript';

const IAM: AWS['provider']['iam'] = {
  role: {
    statements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
        ],
        Resource: 'arn:aws:dynamodb:${aws:region}:*:table/${self:provider.environment.DYNAMO_CHALLENGES_TABLE}',
      },
    ],
  },
};

export default IAM;
