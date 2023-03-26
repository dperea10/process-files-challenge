import {logger} from '../utils/logger';

const mapAuthModelToDto = (model:any) => ({
  id: model._id,
  name: model.email,
  token: Buffer.from(`${model.email}:${model.password}`).toString('base64'),
});

const collectionAuthModelsToDto = (auth:any) => auth.map((a:any) => mapAuthModelToDto(a));

const login = (func:any) => async (...args:any) => {
  try {
    const result = await func(...args);
    if (!result) return null;
    return collectionAuthModelsToDto([result]);
  } catch (err:any) {
    logger.error(err.message || 'Error in login of auth mapper');
    throw new Error(err.message || 'Internal Error');
  }
};

export default {login}
