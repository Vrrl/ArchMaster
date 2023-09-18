import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { HttpRequest } from '@core/infra/http';
import { Router } from '@core/infra/router';
import middy from '@middy/core';
import httpRouterHandler, { Route } from '@middy/http-router';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';

export const middyRouterAdapter = (router: Router) => {
  /*
   * @Adapter: Adapt an @class Router object to Middy Object
   */
  const routes: Array<Route<APIGatewayProxyEventV2>> = router.routes.map(({ path, controller, method }) => {
    const middyHandler = middy<APIGatewayProxyEventV2>().handler(
      async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
        const request: HttpRequest = { ...event };

        const response = await controller.handle(request);

        return {
          ...response,
          body: JSON.stringify(response.body),
        };
      },
    );

    return {
      path,
      method,
      handler: middyHandler,
    };
  });

  return middy().use(httpHeaderNormalizer()).use(httpJsonBodyParser()).handler(httpRouterHandler(routes));
};
