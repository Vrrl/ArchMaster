import { AWS } from '@serverless/typescript';
import { middyRouterAdapter } from './adapters/middy-adapters';
import router from '@infra/http/routes';

export const main = middyRouterAdapter(router);

const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
};

const functions: AWS['functions'] = Object.fromEntries(
  router.routes.map(({ path, method, controller }) => [
    `${controller.constructor.name}`,
    {
      handler: `${handlerPath(__dirname)}/functions.main`,
      events: [
        {
          http: {
            method,
            path,
          },
        },
      ],
    },
  ]),
);

export default functions;
