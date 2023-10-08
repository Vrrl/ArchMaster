export const throwIfUndefinedOrEmptyString = (target: any, errorMessage?: string): string => {
  if (typeof target !== 'string' || target.length === 0) {
    throw new Error(errorMessage || `Expected to target variable to be an valid string: ${target}`);
  }
  return target;
};

export const throwIfUndefined = (target: any, errorMessage?: string): string => {
  if (target === undefined) {
    throw new Error(errorMessage || `Expected to target variable to not be undefined.`);
  }
  return target;
};

export const throwIfNotBoolean = (target: any, errorMessage?: string): boolean => {
  if (!['true', 'True', 'false', 'False', 0, 1].includes(target)) {
    throw new Error(errorMessage || `Expected to target variable to be an valid boolean, got ${target}.`);
  }
  return Boolean(target);
};
