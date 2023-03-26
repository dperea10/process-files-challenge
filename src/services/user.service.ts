import userRepository from "../repositories/user.repository";
import authMapper from "../mappers/auth.mapper";
import IAuth from "../interfaces/authSession";

/**
 * It then calls the login function in the userRepository and
 * takes a username and password as parameters.
 * @param {string} email
 * @param {string} password
 * @returns {boolean} ifExistUser
 */
const authenticate = async ({email, password}: IAuth) => {
  const getLoginDto = authMapper.login(userRepository.login);
  const data = await getLoginDto({email, password});
  if (!data) {
    const error = new Error('Error authenticate');
    error.name = "400";
    throw error;
  }
  return {
    status: 200,
    message: 'User Authenticate',
    user: data[0],
  };
};

/**
 *
 * @param {string} email
 */
const getByUserName = async (email:string) => userRepository.getByUserName(email);

export {
    authenticate,
    getByUserName
}
