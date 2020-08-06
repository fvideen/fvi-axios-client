'use strict'

const server = require('fvi-koa-server')
const chai = require('chai')
const { toConfig } = require('fvi-node-utils/app/objects')

const app = require('../src/index')

const baseCheck = result => {
    chai.assert(!!result, 'request is null!')
    chai.assert(!!result.data, 'request.data is null!')
}

const healthCheck = request => {
    baseCheck(request)
    chai.assert.exists(request.data.process, 'request.data.process is null!')
    chai.assert.exists(request.data.server, 'request.data.server is null!')

    chai.assert.exists(request.data.process.pid, 'request.data.pid is null!')
    chai.assert.exists(request.data.process.version, 'request.data.version is null!')
    chai.assert.exists(request.data.process.env, 'request.data.env is null!')
    chai.assert.exists(request.data.process.memory, 'request.data.memory is null!')
    chai.assert.exists(request.data.server.name, 'request.data.name is null!')
    chai.assert.exists(request.data.server.name, 'request.data.name is null!')
}

const baseResultCheck = result => {
    baseCheck(result)
    chai.assert(!!result.data.result, 'request.data.result is null!')
}

const serverProps = {
    server: {
        name: 'server-to-test',
        version: '1.0',
        port: 9990,
    },
}

describe('Testing Axios Client', () => {
    let instanceServer = null

    before(() =>
        server(toConfig(serverProps))
            .then(s => (instanceServer = s.instance))
            .catch(e => {
                throw e
            })
    )
    after(() => instanceServer.close())

    it('Init with config - OK', done => {
        try {
            const testClient = app({
                url: 'http://localhost:9990',
                headers: {
                    testing: 'test',
                },
                timeout: 30000,
            })
            chai.assert.exists(testClient.getUri())
            chai.assert.equal('http://localhost:9990', testClient.getUri())
            testClient
                .get('/support/ping')
                .then(result => {
                    baseResultCheck(result)
                    chai.assert(result.data.result == 'pong', 'Result Data Is Not Pong Value!')
                    done()
                })
                .catch(done)
        } catch (e) {
            done(e)
        }
    })

    it('Init without config - FAIL', done => {
        try {
            app()
            done('Should be thorws error!')
        } catch (e) {
            done()
        }
    })

    it('Init with config only timeout', done => {
        try {
            app({ timeout: 1000 })
            done('Should be thorws error!')
        } catch (e) {
            done()
        }
    })

    it('Init with config only delay', done => {
        try {
            app({ delay: 10 })
            done('Should be thorws error!')
        } catch (e) {
            done()
        }
    })

    it('Init with config only timeout and delay', done => {
        try {
            app({ timeout: 1000, delay: 10 })
            done('Should be thorws error!')
        } catch (e) {
            done()
        }
    })

    it('Init with config negative timeout ', done => {
        try {
            app({ timeout: -10 })
            done('Should be thorws error!')
        } catch (e) {
            done()
        }
    })

    it('Init with config negative delay', done => {
        try {
            app({ timeout: 1000, delay: -10 })
            done('Should be thorws error!')
        } catch (e) {
            done()
        }
    })

    it('Init with config url=google.com, timeout and delay null', done => {
        try {
            app({ url: 'http://google.com', timeout: null, delay: null })
            done('Should be thorws error!')
        } catch (e) {
            done()
        }
    })

    it('Init with config url=google.com, timeout null', done => {
        try {
            app({ url: 'http://google.com', timeout: null })
            done('Should be thorws error!')
        } catch (e) {
            done()
        }
    })

    it('Init with config url=google.com, delay null', done => {
        try {
            app({ url: 'http://google.com', delay: null })
            done('Should be thorws error!')
        } catch (e) {
            done()
        }
    })

    it('Init with config url=google.com, timeout and delay 0', done => {
        try {
            app({ url: 'http://google.com', timeout: 0, delay: 0 })
            done('Should be thorws error!')
        } catch (e) {
            done()
        }
    })

    describe('Testing http errors', () => {
        it('# Testing GET 404', done => {
            const testClient = app({
                url: 'http://localhost:9990',
                timeout: 30000,
            })
            testClient
                .get('/support/404')
                .then(result => {
                    done('URL nao existe, deveria dar erro 404!')
                })
                .catch(_e => done())
        })

        it('# Testing POST 404', done => {
            try {
                const testClient = app({
                    url: 'http://localhost:9990',
                    timeout: 30000,
                })
                testClient
                    .post('/support/post/404')
                    .then(result => {
                        done('URL nao existe, deveria dar erro 404!')
                    })
                    .catch(_e => done())
            } catch (e) {
                done(e)
            }
        })
    })

    describe('Testing /support endpoints', () => {
        it('# Testing Support Ping', done => {
            const testClient = app({
                url: 'http://localhost:9990',
                timeout: 30000,
            })
            testClient
                .get('/support/ping')
                .then(result => {
                    baseResultCheck(result)
                    chai.assert(result.data.result == 'pong', 'Result Data Is Not Pong Value!')
                    done()
                })
                .catch(done)
        })

        it('# Testing Support Echo', done => {
            const testClient = app({
                url: 'http://localhost:9990',
                timeout: 30000,
            })
            testClient
                .get('/support/echo/testing')
                .then(result => {
                    baseResultCheck(result)
                    chai.assert(
                        result.data.result == 'testing',
                        'Result Data Is Not testing Value!'
                    )
                    done()
                })
                .catch(done)
        })

        it('# Testing Support Health', done => {
            const testClient = app({
                url: 'http://localhost:9990',
                timeout: 30000,
            })
            testClient
                .get('/support/health')
                .then(result => {
                    healthCheck(result)
                    done()
                })
                .catch(done)
        })
    })

    describe('Testing mock', () => {
        it('Init with config mocking - OK', done => {
            const testClient = app({
                url: 'http://',
                mock: true,
            })

            // mocking
            testClient.mock.onGet('/support/ping').reply(200, { result: 'pong' })

            testClient
                .get('/support/ping')
                .then(result => {
                    baseResultCheck(result)
                    chai.assert(result.data.result == 'pong', 'Result Data Is Not Pong Value!')
                    done()
                })
                .catch(done)
        })

        it('Init with mocking /test-mock returning "OK"', done => {
            const testClient = app({
                url: 'http://',
                mock: true,
            })

            chai.assert.exists(testClient.mock, 'testClient.mock not exists!')

            // mocking
            testClient.mock.onGet('/test-mock').reply(200, { result: 'OK' })

            testClient
                .get('/test-mock')
                .then(result => {
                    baseResultCheck(result)
                    chai.assert(result.data.result == 'OK', 'Result Data Is Not OK Value!')
                    done()
                })
                .catch(done)
        })
    })
})
