/* eslint-disable no-import-assign */
/* eslint-disable no-undef */

jest.mock('express-validator', () => ({
  checkSchema: jest.fn().mockReturnValue([
    {
      run: jest.fn(),
    },
  ]),
  validationResult: jest.fn(() => ({ isEmpty: () => true })),
}));

import httpMocks from 'node-mocks-http';
import { validationResult } from 'express-validator';

import validate from '../middlewares';
import authValidation from '../controllers';

describe('Validator Middleware', () => {
  test('calls next if there are no validation errors', async () => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = jest.fn();

    await validate(authValidation.login)(request, response, next);
    expect(response.statusCode).toBe(200);
    expect(next).toBeCalled();
  });

  test('calls errors with status 422', async () => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = jest.fn();

    validationResult.mockImplementation(() => ({
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest
        .fn()
        .mockReturnValue([{ test1: 'error1' }, { test2: 'error2' }]),
    }));

    await validate(authValidation.login)(request, response, next);
    expect(response.statusCode).toBe(422);
    expect(next).not.toBeCalled();
  });
});
