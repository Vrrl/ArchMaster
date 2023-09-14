import { HttpRequest, HttpResponse } from './http';

type httpMethods = 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';

type route = {
  method: httpMethods;
  path: string;
  handler: (httpRequest: HttpRequest) => Promise<HttpResponse>;
};

export class Router {
  constructor(prefix?: string) {
    this.prefix = prefix ?? '';
    this.rawRoutes = [];
  }

  rawRoutes: route[];
  prefix?: string;

  get routes(): route[] {
    return this.rawRoutes.map(rawRoute => {
      return {
        method: rawRoute.method,
        path: this.prefix + rawRoute.path,
        handler: rawRoute.handler,
      };
    });
  }

  addRoute(route: route): void {
    this.rawRoutes.push(route);
  }

  get(path: string, handler: (httpRequest: HttpRequest) => Promise<HttpResponse>) {
    this.addRoute({ method: 'GET', path, handler });
  }

  post(path: string, handler: (httpRequest: HttpRequest) => Promise<HttpResponse>) {
    this.addRoute({ method: 'POST', path, handler });
  }

  delete(path: string, handler: (httpRequest: HttpRequest) => Promise<HttpResponse>) {
    this.addRoute({ method: 'DELETE', path, handler });
  }

  put(path: string, handler: (httpRequest: HttpRequest) => Promise<HttpResponse>) {
    this.addRoute({ method: 'PUT', path, handler });
  }

  patch(path: string, handler: (httpRequest: HttpRequest) => Promise<HttpResponse>) {
    this.addRoute({ method: 'PATCH', path, handler });
  }

  useRouter(routers: Router[]): void {
    routers.map(router => {
      router.routes.map(route => {
        this.addRoute(route);
      });
    });
  }
}
