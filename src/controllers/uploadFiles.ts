import { NextFunction } from './../../node_modules/@types/express-serve-static-core/index.d';
import { Request, Response } from "express";
import service from "../services";
import { handleHttp } from "../utils/errHandler";
import { logger } from '../utils/logger';

const getFileAndCreateRegisters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileBuffer:any = req.file?.buffer;
    const uploadFile = await service.registerUpload(fileBuffer);
    res.status(200).json(uploadFile);
  } catch (e) {
    handleHttp(res, "ERROR_POST_FILE");
  }
};

const getInfoTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getInfo = await service.getInfoDB(req.query);
    res.status(200).json(getInfo);
  } catch (e) {
    logger.error('Error list in uploadFile.controller', e);
    handleHttp(res, "ERROR_GET_FILE"); 
  }
};

export { getFileAndCreateRegisters, getInfoTransaction };