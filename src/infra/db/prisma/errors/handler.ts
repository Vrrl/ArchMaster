import * as CoreErrors from '@src/core/errors';

export const prismaErrorHandler = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const oldFunc = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    // Usando parâmetros rest
    try {
      return await oldFunc.apply(this, args);
    } catch (error) {
      console.error(error);
      throw new CoreErrors.InfrastructureError(String(error));
    }
  };
};
