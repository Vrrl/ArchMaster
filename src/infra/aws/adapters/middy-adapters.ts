import { HttpRequest } from 'src/core/infra/http';
import { Router } from '@core/infra/router';
import middy from '@middy/core';
import httpRouterHandler from '@middy/http-router';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const middyRouterAdapter = (router: Router) => {
  /*
   * @Adapter: Adapt an @class Router object to Middy Object
   */
  const routes = router.routes.map(({ path, controller, method }) => {
    const middyHandler = middy().handler(async (event: APIGatewayEvent, context: Context) => {
      const request: HttpRequest = {
        body: event.body,
      };
      return await controller.handle(request);
    });

    return {
      path,
      method,
      handler: middyHandler,
    };
  });

  return middy().use(httpHeaderNormalizer()).handler(httpRouterHandler(routes));
};
