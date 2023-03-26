import { NextFunction } from './../../node_modules/@types/express-serve-static-core/index.d';
import userService from "../services";
import { Request, Response } from "express";
import {logger} from "../utils/logger";

const login = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const {
      email,
      password,
    } = req.body;
    const login = await userService.authenticate({email, password});
    res.status(200).json(login);
  } catch (err:any) {
    if (err !== 400) {
      logger.error('Error login in auth.controller', err);
    }
    next(err);
  }
};

export {login}
