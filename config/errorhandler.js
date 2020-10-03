module.exports = function(err, req, res, next) {
  if(process.env.APP_ENV === 'development') {
    // TODO: Log the error
    console.log(err);
    next(err);
  } else {
    return res.status(500).json({ error: err.message });
  }
};
