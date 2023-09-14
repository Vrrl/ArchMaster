export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  files?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}
