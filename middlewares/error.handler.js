const { stack } = require("../routes/products.router");

function logErrors (err,req,res,next) {
  console.error(err.stack);
  next(err);
}

function errorHandler (err,req,res,next) {
  res.status(500).json({
    error:err.message || 'Ha ocurrido un error en el servidor',
    stack: error.stack,
  });
}

function boomErrorHandler (err,req,res,next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }else{
    next(err);
  }
}

module.exports = {logErrors,errorHandler,boomErrorHandler}
