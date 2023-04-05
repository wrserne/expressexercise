const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

app.get('/mean', function(req, res, next) {
  try {
    const nums = convertAndValidateNumsArray(req.query.nums.split(','));
    const result = { operation: "mean", result: findMean(nums) };
    return res.send(result);
  } catch (err) {
    return next(new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400));
  }
});

app.get('/median', function(req, res, next) {
  try {
    const nums = convertAndValidateNumsArray(req.query.nums.split(','));
    const result = { operation: "median", result: findMedian(nums) };
    return res.send(result);
  } catch (err) {
    return next(new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400));
  }
});

app.get('/mode', function(req, res, next) {
  try {
    const nums = convertAndValidateNumsArray(req.query.nums.split(','));
    const result = { operation: "mode", result: findMode(nums) };
    return res.send(result);
  } catch (err) {
    return next(new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400));
  }
});

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  return res.status(status).json({ error: err, message: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Server starting on port ${port}`);
});
