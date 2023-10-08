import express from 'express';
import * as health from '../controllers/health';
import convert from './convert';

export default {
  init (app: express.Application) {
    app.get('/_health', health.check);
    app.use('/v1/convert', convert);
  },
}
