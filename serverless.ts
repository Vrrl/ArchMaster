import type { AWS } from '@serverless/typescript';
import functions from '@infra/aws/functions';
import iam from '@infra/aws/iam';
import resources from '@infra/aws/resources';
import environment from '@infra/aws/environment';

const serverlessConfiguration: AWS = {
  service: 'ArchMaster',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    deploymentMethod: 'direct',
    versionFunctions: false,
    timeout: 30,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    httpApi: {
      cors: true,
    },
    environment,
    iam,
  },
  functions,
  resources,
  package: { individually: true },
  custom: {
    yarn: {
      enable: true,
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline': { noPrependStageInUrl: true },
  },
};

module.exports = serverlessConfiguration;
