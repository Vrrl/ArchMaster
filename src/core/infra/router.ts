import { Controller } from './controller';

type httpMethods = 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';

type route = {
  method: httpMethods;
  path: string;
  controller: Controller;
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
        controller: rawRoute.controller,
      };
    });
  }

  addRoute(route: route): void {
    this.rawRoutes.push(route);
  }

  get(path: string, controller: Controller) {
    this.addRoute({ method: 'GET', path, controller });
  }

  post(path: string, controller: Controller) {
    this.addRoute({ method: 'POST', path, controller });
  }

  delete(path: string, controller: Controller) {
    this.addRoute({ method: 'DELETE', path, controller });
  }

  put(path: string, controller: Controller) {
    this.addRoute({ method: 'PUT', path, controller });
  }

  patch(path: string, controller: Controller) {
    this.addRoute({ method: 'PATCH', path, controller });
  }

  useRouter(routers: Router[]): void {
    routers.map(router => {
      router.routes.map(route => {
        this.addRoute(route);
      });
    });
  }
}
