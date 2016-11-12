var context = require('aws-lambda-mock-context')
var expect = require('chai').expect
var index = require('../dist/index')

var ctx = context()

var helperFuncs = require('./testingHelperFunctions')
var createRequest = helperFuncs.createRequest

/*
global describe before it
*/

describe('testing unit data intent', function () {
  var speechResponse = null
  var speechError = null

  before(function (done) {
    index.Handler(
      createRequest('UnitDataIntent', {
        'Unit': {
          'name': 'Unit',
          'value': 'marine'
        }
      }), ctx)

    ctx.Promise
      .then(response => {
        speechResponse = response
        done()
      })
      .catch(error => {
        speechError = error
        done()
      })
  })

  describe('is the response correct', function () {
    it('should not have an error', function () {
      expect(speechError).to.be.null
    })
    it('should have a response', function () {
      console.log(speechResponse)
      expect(speechResponse).not.to.be.null
    })
  })
})
