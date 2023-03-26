import { Router } from "express";

import validate from './../middleware/validate';
import authController from "../../controllers";
import authValidation from "../validations/auth.validation";

const authRoute = Router();

authRoute.post('/auth', validate(authValidation.authValidate), authController.login)

export {authRoute};