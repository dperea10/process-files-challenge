import {registerUpload, getInfoDB} from "./uploadFiles.service";
import {authenticate} from "./user.service";
import {getByUserName} from "./user.service";

export default {
  registerUpload,
  authenticate,
  getByUserName,
  getInfoDB
}