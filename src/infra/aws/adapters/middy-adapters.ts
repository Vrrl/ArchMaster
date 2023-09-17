import { HttpRequest } from 'src/core/infra/http';
import { Router } from '@core/infra/router';
import middy from '@middy/core';
import httpRouterHandler, { Route } from '@middy/http-router';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda';

export const middyRouterAdapter = (router: Router) => {
  /*
   * @Adapter: Adapt an @class Router object to Middy Object
   */
  const routes: Array<Route<APIGatewayProxyEventV2>> = router.routes.map(({ path, controller, method }) => {
    const middyHandler = middy().handler(async (event): Promise<APIGatewayProxyStructuredResultV2> => {
      const request: HttpRequest = { ...(event as object) };

      const response = await controller.handle(request);

      return {
        ...response,
        body: JSON.stringify(response.body),
      };
    });

    return {
      path: '/' + path,
      method: 'GET',
      handler: middyHandler,
    };
  });

  return middy().use(httpHeaderNormalizer()).handler(httpRouterHandler(routes));
};
