import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have a name!'],
      trim: true,
      minlength: 4,
    },

    email: {
      type: String,
      required: [true, 'User must have a name!'],
      unique: [true, 'Email must be unique. try Again!'],
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid Email!'],
    },

    photo: String,

    password: {
      type: String,
      required: [true, 'Please provide password!'],
      minlength: 8,
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm password!'],
      validate: {
        // this only works on CREATE && SAVE !!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Confirm Password did not matched!',
      },
    },

    passwordChangedAt: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  // only run this function if password was modified
  if (!this.isModified('password')) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);

  // delete the passwordConfirm
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000);
    console.log(changedAt, jwtTimestamp);

    return jwtTimestamp < changedAt;
  }

  return false;
};

export default mongoose.model('User', userSchema);
