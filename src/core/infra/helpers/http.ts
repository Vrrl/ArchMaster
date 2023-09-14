import { HttpResponse } from '../http';

export const ok = (body: any): HttpResponse => {
  return {
    statusCode: 200,
    body,
  };
};

export const created = (body: any): HttpResponse => {
  return {
    statusCode: 201,
    body,
  };
};

export const badRequest = (error: object): HttpResponse => {
  return {
    statusCode: 400,
    body: { message: error },
  };
};

export const Unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: { message: 'Unauthorized' },
  };
};

export const forbidden = (error: Error): HttpResponse => {
  return {
    statusCode: 403,
    body: { message: error.message },
  };
};

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: { message: 'Internal server error' },
  };
};
