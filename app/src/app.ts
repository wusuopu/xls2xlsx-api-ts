import "./alias";
import express, { Errback, Request, Response } from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import routes from '@/routes';
import { ResponseError } from '@/types/error';
import formMiddleware from "@/middlewares/form";

const app = express();
app.use(expressWinston.logger({
  transports: [
    process.env.NODE_ENV !== 'test' ?
      new winston.transports.Console() :
      new winston.transports.File({filename: 'test.log', dirname: 'tmp'})
  ],
  ignoredRoutes: ['/health_check'],
  meta: true,
  expressFormat: true
}))
app.use(formMiddleware);
routes.init(app);

app.use((err: ResponseError, req: Request, res: Response, next: Errback) => {
  console.error(req.method, req.path, err)
  if (res.headersSent) {
    return next(err)
  }
  return res.status(err.statusCode || 500).json({errors: [err.message]})
})

app.get('/', (_: Request, res: Response) => {
  res.send({
    message: 'hello world',
  });
});

export default app;
