import { Controller } from './controller';

type httpMethods = 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';

type route = {
  method: httpMethods;
  path: string;
  controller: Controller;
};

export class Router {
  constructor(prefix: string = '') {
    this.prefix = prefix;
    this.rawRoutes = [];
  }

  rawRoutes: route[];
  prefix: string;

  private joinPaths(head: string, tail: string): string {
    const normalizedHead = head.endsWith('/') ? head : head + '/';
    const normalizedTail = tail.startsWith('/') ? tail.substring(1) : tail;
    const newPath = normalizedHead + normalizedTail;

    return newPath.endsWith('/') ? newPath.slice(0, -1) : newPath;
  }

  get routes(): route[] {
    return this.rawRoutes.map(rawRoute => {
      const fullPath = this.joinPaths(this.prefix, rawRoute.path);
      return {
        method: rawRoute.method,
        path: fullPath.startsWith('/') ? fullPath : '/' + fullPath,
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
