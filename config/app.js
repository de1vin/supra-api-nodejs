const { BaseConfig } = require('supra-core')
const logger = require('../logger')

class AppConfig extends BaseConfig {
  constructor () {
    super()
    this.nodeEnv = this.set('NODE_ENV', v => ['development', 'production', 'test'].includes(v), 'development')
    this.port = this.set('APP_PORT', this.joi.number().port().required(), 5555)
    this.host = this.set('APP_HOST', this.joi.string().required(), 'localhost')
    this.name = this.set('APP_NAME', this.joi.string().required(), 'SupraAPI')
    this.url = this.set('APP_URL', this.joi.string().required())
    this.sentryDsn = this.set('SENTRY_DSN', this.joi.string().required())
  }

  async init () {
    await this.fetchAndSetAsyncValue()
    logger.debug(`${this.constructor.name}: Initialization finish...`)
  }

  fetchAndSetAsyncValue () { // just tor example
    return new Promise(resolve => {
      setTimeout(() => {
        this.testAsyncValue = this.setDirect('some async value', this.joi.string().required(), 'async value')
        this.testDefaultAsyncValue = this.setDirect(undefined, this.joi.string().required(), 'default async value')
        resolve()
      }, 100)
    })
  }
}

module.exports = new AppConfig()
