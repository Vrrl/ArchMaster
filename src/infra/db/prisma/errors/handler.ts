import { CoreErrors } from "@src/core/errors";


export const prismaErrorHandler = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  
    let oldFunc = descriptor.value;
    descriptor.value = async function (){
      try {

        return await oldFunc.apply(this, arguments);
  
      } catch (error) {
        console.error(error)
        throw new CoreErrors.InfrastructureError(String(error));
      }
      
    }
}