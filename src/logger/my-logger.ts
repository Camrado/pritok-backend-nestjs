import { Injectable, LoggerService } from '@nestjs/common';
import winston = require('winston');

const { combine, timestamp, printf, prettyPrint, colorize } = winston.format;

@Injectable()
export class MyLogger implements LoggerService {
  private logger;

  constructor() {
    this.setLogger();
  }

  private setLogger() {
    const commonFormat = printf(({ level, message, details }) => {
      return `${new Date()} [${details}] ${level}: ${message}`;
    });

    const errorFormat = printf(({level, message, details}) => {
      return `{\n  date: '${new Date()}',\n  level: '${level}',\n  message: '${message}',\n  details: '${details}'\n}`;
    });

    this.logger = winston.createLogger({
      level: 'debug',
      transports: [
        new winston.transports.File({
          filename: 'logs/errors.log',
          level: 'error',
          format: errorFormat,
        }),
        new winston.transports.Console({
          level: 'debug',
          format: combine(commonFormat, colorize({ all: true })),
        }),
      ],
      exitOnError: false,
    });
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error({
      message,
      details: optionalParams,
    });
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info({
      message,
      details: optionalParams,
    });
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn({
      message,
      details: optionalParams,
    });
  }

  debug(message: any, ...optionalParams) {
    this.logger.debug({
      message,
      details: optionalParams,
    });
  }
}