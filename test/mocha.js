var context = require('aws-lambda-mock-context')
var expect = require('chai').expect
var index = require('../dist/index')

var ctx = context()

/*
global describe before
*/

describe('testing a session', function () {
  var speechResponse = null
  var speechError = null

  before(function (done) {  // happens before test
    index.Handler({
      'session': {
        'sessionId': 'SessionId.8d7f65bb-9822-404e-ac40-5cd7ba355334',
        'application': {
          'applicationId': 'my_alexa_id'
        },
        'attributes': {},
        'user': {
          'userId': 'amzn1.ask.account.AHQB2AGWQNB7IEW5ALP56VL4232XHYDJHO6EXGO54IR22ASNQUDHXGFPJ2ZWCFGHYEOSVNYSXQ4I5CQCYNOZXY6NZEEQJVEDVRML3PL72GUHUPTOBKN4DVR3A27KW6TF5CF3FDBIM4HSYSL6E2AOSJTRGWYPABCGOE3KTL6YGLIC6DTLJCTWE4UYZDRNMLH6VIVT2UJOEE2NSWA'
        },
        'new': true
      },
      'request': {
        'type': 'IntentRequest',
        'requestId': 'EdwRequestId.1a81f89d-bea9-4050-ad9a-0a31d1d81c63',
        'locale': 'en-US',
        'timestamp': '2016-11-11T03:49:54Z',
        'intent': {
          'name': 'UnitDataIntent',
          'slots': {
            'Unit': {
              'name': 'Unit',
              'value': 'marine'
            }
          }
        }
      },
      'version': '1.0'
    }, ctx)

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
