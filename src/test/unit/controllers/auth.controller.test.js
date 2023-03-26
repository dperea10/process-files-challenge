/* eslint-disable no-import-assign */
/* eslint-disable no-undef */

jest.mock('../../../services/user.service');

import httpMocks from "node-mocks-http";

const authController = require('../../../controllers/auth.controller');
const userService = require('../../../services/user.service');

describe('Auth Controller', () => {
  test('calls next if there are no validation errors', async () => {
    const request = httpMocks.createRequest();
    request.body = {
      email: 'user',
      password: 'user',
    };
    const response = httpMocks.createResponse();
    const next = jest.fn();

    userService.authenticate.mockResolvedValue({ test: 'test' });

    await authController.login(request, response, next);
    expect(response.statusCode).toBe(200);
    expect(response._getData()).toBe(JSON.stringify({ test: 'test' }));
  });

  test('Error 400 Invalid Authentication Credentials', async () => {
    const request = httpMocks.createRequest();
    request.body = {
      email: 'user',
      password: 'user',
    };
    const response = httpMocks.createResponse();
    const next = jest.fn();
    const error = new Error('Test error message');
    error.status = 400;

    userService.authenticate.mockRejectedValue(error);

    await authController.login(request, response, next);
    expect(next).toBeCalled();
  });

  test('Error 500 internal error', async () => {
    const request = httpMocks.createRequest();
    request.body = {
      email: 'user',
      password: 'user',
    };
    const response = httpMocks.createResponse();
    const next = jest.fn();
    const error = new Error('Test error message');
    error.status = 500;

    userService.authenticate.mockRejectedValue(error);

    await authController.login(request, response, next);
    expect(next).toBeCalled();
  });
});
