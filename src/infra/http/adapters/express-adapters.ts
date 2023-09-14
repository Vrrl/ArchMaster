import { Request, Response } from 'express';
import { HttpRequest } from '@core/infra/http';
import { ControllerFactory } from '@core/infra/controller';

export const adaptController = (factory: ControllerFactory) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    const controller = factory.makeController();
    const httpResponse = await controller.handle(httpRequest);
    return res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
