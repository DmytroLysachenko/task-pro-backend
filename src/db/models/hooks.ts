export const mongoSaveError = (error: any, data: any, next: any) => {
  const { name, code } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

export const setMongoUpdateSettings = function (this: any, next: any) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
