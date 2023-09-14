// export abstract class MiddlewareFactory {
//   protected validation: Validation
//   protected mid: Middleware

//   constructor(optional?: boolean, middlewareList?: Middleware[]){
//       this.validation = new Validation()
//       this.validation.setConfig(() => this.validations(optional))
//       this.mid = this.middleware()
//       this.mid.setValidation(this.validation)
//       optional && this.mid.setOptional(optional)
//       if(middlewareList){
//           middlewareList.unshift(this.mid)
//           for(let i = 0; i < middlewareList.length; i++){
//               if(!middlewareList[i+1])
//                   break
//               middlewareList[i].linkWith(middlewareList[i+1])
//           }
//       }
//   }

//   abstract validations(optional?: boolean): (Error | null)[]
//   abstract middleware(): Middleware

//   make(): Middleware {
//       return this.mid
//   }
// }

// export abstract class Middleware {
//   private next: Middleware | null = null;
//   private validation: Validation
//   protected optional: boolean = false

//   setValidation(validation: Validation) {
//     this.validation = validation
//   }

//   setOptional(v: boolean) {
//     this.optional = v
//   }

//   linkWith(middleware: Middleware): this {
//     this.next = middleware;
//     return this;
//   }

//   async handleNext(httpRequest: HttpRequest): Promise<HttpResponse> {
//     if (!this.next) {
//       return ok(httpRequest.body);
//     }

//     return await this.next.handle(httpRequest);
//   }

//   async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
//     try {
//       if (this.validation) {
//         const error = this.validation.validate(httpRequest.headers);
//         if (error) return badRequest(error);
//       }

//       return await this.perform(httpRequest);
//     } catch (error) {
//       if(error instanceof HttpException){
//         return {
//           statusCode: error.statusCode,
//           body: {message: error.message}
//         }
//       }

//       console.log(error);
//       return serverError();
//     }
//   }

//   abstract perform(httpRequest: HttpRequest): Promise<HttpResponse>;
// }
