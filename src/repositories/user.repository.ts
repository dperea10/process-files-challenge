import IAuth from './../interfaces/authSession';
import { User } from '../models/user.model';

const login = async ({email, password}: IAuth) => {
  const user:any = await getByUserName(email);
  if (user && user.verifyPassword(password)) {
    return user;
  }

  return null;
};

const getByUserName = async (email:string) => User.findOne({ email });

export default {
  login,
  getByUserName
}