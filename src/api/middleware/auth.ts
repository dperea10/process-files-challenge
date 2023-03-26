// import { Request } from './../../../node_modules/@types/express-serve-static-core/index.d';
import { NextFunction, Request, Response } from 'express';
import userService from "../../services";


const auth = async (req:Request, res:Response, next:NextFunction) => {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');

  // authenticate with credentials
  try {
    const user = await userService.authenticate({email, password});
    req.body.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }
};

export default {auth}
