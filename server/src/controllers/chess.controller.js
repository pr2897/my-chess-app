const catchAsync = require('../utils/catchAsync');

const helloWorld = catchAsync(async (req, res) => {
  res.send('hello worlld');
});

module.exports = {
  helloWorld,
};
