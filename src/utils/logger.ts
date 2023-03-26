import winston from 'winston';

const tsFormat = (new Date()).toLocaleTimeString();
export const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info',
      silent: false,
    }),
  ],
});


