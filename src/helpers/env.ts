export const env = (name: string, defaultValue?: string) => {

  const value = process.env[name];
  
  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`No value in process.env[${name}]`);
};
