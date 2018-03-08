
/**
 * test server
 */

const Logoran = require('logoran')
const Boom = require('boom')
const Router = require('logoran-router')
const router = new Router();
const logger = require('./index')

const app = new Logoran()
app.use(logger())

router.get('/200', function (ctx, next) {
  ctx.body = 'hello world';
  next();
});

router.get('/301', function (ctx, next) {
  ctx.status = 301;
  next();
});

router.get('/304', function (ctx, next) {
  ctx.status = 304;
  next();
});

router.get('/404', function (ctx, next) {
  ctx.status = 404;
  ctx.body = 'not found';
  next();
});

router.get('/500', function (ctx, next) {
  ctx.status = 500;
  ctx.body = 'server error';
  next();
});

router.get('/500-boom', function (ctx) {
  ctx.throw(Boom.badImplementation('terrible implementation'));
});

router.get('/error', function (ctx) {
  throw new Error('oh no');
});

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app
