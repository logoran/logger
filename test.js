'use strict'
/**
 * test cases
 */

// test tools
const Logoran = require('logoran')
const chai = require('chai')
const sinon = require('sinon')
const sc = require('sinon-chai')
const request = require('supertest')
const moment = require('moment');
const logger = require('./index')
chai.use(sc)
const expect = chai.expect

// test subjects
const chalk = require('chalk')
const app = require('./test-server')
let log, sandbox

describe('logoran-logger', function (done) {
  it('should can get start_at after logger', function () {
    const app = new Logoran()

    app.use(logger())

    app.use((ctx, next) => {
      expect(ctx.start_at).to.exist
      ctx.body = 'ok';
    })

    request(app.listen()).get('/').expect(200, 'ok', function () {
      done()
    })
  });

  describe('logoran-logger-log', function () {
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      log = sandbox.spy(console, 'log')
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('should log a request', function (done) {
      request(app.listen()).get('/200').expect(200, 'hello world', function () {
        expect(log).to.have.been.called // eslint-disable-line
        done()
      })
    })

    it('should log a request', function (done) {
      request(app.listen()).get('/200').expect(200, 'hello world', function () {
        expect(log).to.have.been.called // eslint-disable-line
        done()
      })
    })

    it('should log a request with correct method and url', function (done) {
      request(app.listen()).head('/200').expect(200, function () {
        expect(log).to.have.been.calledWith('  ' + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ' ' + chalk.gray('<--') +
          ' ' + chalk.bold('%s') +
          ' ' + chalk.gray('%s'),
            'HEAD',
            '/200')
        done()
      })
    })

    it('should log a response', function (done) {
      request(app.listen()).get('/200').expect(200, function () {
        expect(log).to.have.been.calledTwice // eslint-disable-line
        done()
      })
    })

    it('should log a 200 response', function (done) {
      request(app.listen()).get('/200').expect(200, function () {
        expect(log).to.have.been.calledWith('  ' + chalk.gray('-->') +
          ' ' + chalk.bold('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.green('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.gray('%s'),
            'GET',
            '/200',
            200,
            sinon.match.any,
            '11b')
        done()
      })
    })

    it('should log a 301 response', function (done) {
      request(app.listen()).get('/301').expect(301, function () {
        expect(log).to.have.been.calledWith('  ' + chalk.gray('-->') +
          ' ' + chalk.bold('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.cyan('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.gray('%s'),
            'GET',
            '/301',
            301,
            sinon.match.any,
            '-')
        done()
      })
    })

    it('should log a 304 response', function (done) {
      request(app.listen()).get('/304').expect(304, function () {
        expect(log).to.have.been.calledWith('  ' + chalk.gray('-->') +
          ' ' + chalk.bold('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.cyan('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.gray('%s'),
            'GET',
            '/304',
            304,
            sinon.match.any,
            '')
        done()
      })
    })

    it('should log a 404 response', function (done) {
      request(app.listen()).get('/404').expect(404, function () {
        expect(log).to.have.been.calledWith('  ' + chalk.gray('-->') +
          ' ' + chalk.bold('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.yellow('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.gray('%s'),
            'GET',
            '/404',
            404,
            sinon.match.any,
            '9b')
        done()
      })
    })

    it('should log a 500 response', function (done) {
      request(app.listen()).get('/500').expect(500, function () {
        expect(log).to.have.been.calledWith('  ' + chalk.gray('-->') +
          ' ' + chalk.bold('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.red('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.gray('%s'),
            'GET',
            '/500',
            500,
            sinon.match.any,
            '12b')
        done()
      })
    })

    it('should log middleware error', function (done) {
      request(app.listen()).get('/error').expect(500, function () {
        expect(log).to.have.been.calledWith('  ' + chalk.red('xxx') +
          ' ' + chalk.bold('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.red('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.gray('%s'),
            'GET',
            '/error',
            500,
            sinon.match.any,
            '-')
        done()
      })
    })

    it('should log a 500 response with boom', function (done) {
      request(app.listen()).get('/500-boom').expect(500, function () {
        expect(log).to.have.been.calledWith('  ' + chalk.red('xxx') +
          ' ' + chalk.bold('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.red('%s') +
          ' ' + chalk.gray('%s') +
          ' ' + chalk.gray('%s'),
            'GET',
            '/500-boom',
            500,
            sinon.match.any,
            '-')
        done()
      })
    })
  })
});
