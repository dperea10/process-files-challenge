const { checkSchema } = require('express-validator');

 const authValidate = checkSchema({
  email: {
    optional: false,
    isString: {
      errorMessage: 'email should be String',
    },
  },
  password: {
    optional: false,
    isString: {
      errorMessage: 'password should be String',
    },
  },
}, ['body']);

export default {authValidate}

