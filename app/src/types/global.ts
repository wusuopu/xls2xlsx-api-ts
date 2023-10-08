import { Request } from 'express';

export interface HTTPRequest extends Request {
  files?: any;
}
