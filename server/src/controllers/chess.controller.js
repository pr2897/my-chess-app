import catchAsync from '../utils/catchAsync.js';

const helloWorld = catchAsync(async (req, res) => {
  res.send('hello worlld');
});

export default {
  helloWorld,
};
