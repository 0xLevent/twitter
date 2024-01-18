import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
},

);



userSchema.pre('save', async function (next) {
  try {
    const user = this;
       next();
  } catch (error) {
    next(error);
  }
});


const User = mongoose.model("User", userSchema);

export default User;