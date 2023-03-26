import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import IAuth from "../interfaces/authSession"

const UserSchema = new mongoose.Schema<IAuth>({
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

UserSchema.methods.verifyPassword = function (password:string) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', async function (callback) {
  const user:any = this;

  if (!user.isModified('password')) return callback();

  bcrypt.genSalt(5, (err, salt) => {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) return callback(error);
      user.password = hash;
      user.status = user.status ? 1 : 0;
      callback();
    });
  });
});

export const User = mongoose.model<IAuth>('User', UserSchema);
