module.exports = {
  createRequest: function (intentName, intentSlots) {
    return {
      'session': {
        'sessionId': 'SessionId.8d7f65bb-9822-404e-ac40-5cd7ba355334',
        'application': {
          'applicationId': 'amzn1.ask.skill.8bf5b4cf-73a9-446c-9169-57abbbd87101'
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
          'name': intentName,
          'slots': intentSlots
        }
      },
      'version': '1.0'
    }
  }
}
