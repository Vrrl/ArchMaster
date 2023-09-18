import type { AWS } from '@serverless/typescript';

const environment: AWS['provider']['environment'] = {
  NODE_ENV: 'dev',
  NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
  DYNAMO_CHALLENGES_TABLE: 'challenges',
};

export default environment;
