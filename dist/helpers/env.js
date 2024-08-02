export const env = (name, defaultValue) => {
    const value = process.env[name];
    if (value)
        return value;
    if (defaultValue)
        return defaultValue;
    throw new Error(`No value in process.env[${name}]`);
};
