import { existsSync, mkdirSync } from 'fs';
import Path from "path";
import os from "os";
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const NODE_ENV = process.env.NODE_ENV || 'development'

// logs dir
const logDir: string = Path.join(Path.resolve(process.cwd()), 'tmp/logs');

if (!existsSync(logDir)) {
  mkdirSync(logDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYYMMDD',
      dirname: logDir, // log file /logs/error-*.log in save
      filename: `error-${NODE_ENV}-%DATE%-${os.hostname()}.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
  exitOnError: false
});
export default logger;
