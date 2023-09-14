import router from '../http/routes';
import { middyRouterAdapter } from './adapters/middy-adapters';

const handler = middyRouterAdapter(router);

export default handler;

export const main = {
  handler: `./dist/src/infra/aws/functions.handler`,
  events: [
    {
      http: {
        method: 'ANY',
        path: '/',
      },
    },
  ],
};
