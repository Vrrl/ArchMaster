import { AWS } from '@serverless/typescript';
import router from '../http/routes';
import { middyRouterAdapter } from './adapters/middy-adapters';

export const main = middyRouterAdapter(router);

export const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
};

const functions: AWS['functions'] = Object.fromEntries(
  router.routes.map(({ path, method }, index) => [
    `functionName${index}`,
    {
      handler: `${handlerPath(__dirname)}/functions.main`,
      events: [
        {
          http: {
            method: 'GET',
            path: '/v1/challenge/',
          },
        },
      ],
    },
  ]),
);

export default functions;
