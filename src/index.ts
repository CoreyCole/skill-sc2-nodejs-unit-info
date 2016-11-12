import * as Alexa from "alexa-sdk";

export class Handler {

  constructor(event: Alexa.RequestBody, context: Alexa.Context, callback: Function) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = "my_alexa_id";

    let unitData = require('./data/unit-data.json');

    let handlers = {
      "UnitDataIntent": function() {
        let self: Alexa.Handler = this;
        let intentRequest = <Alexa.IntentRequest> self.event.request;
        let unit: string = <string> intentRequest.intent.slots.Unit.value;
        let output: string = "What would you like to know about the " + unit.toLowerCase() + "?";
        console.dir(intentRequest);
        self.emit(":tellWithCard", output, "Unit Data Intent", output);
      },
      "UnitDamageIntent": function() {
        let self: Alexa.Handler = this;
        let intentRequest = <Alexa.IntentRequest> self.event.request;
        let unit: string = <string> intentRequest.intent.slots.Unit.value;
        let groundDps = unitData[unit.toLowerCase()]['groundDps'];
        let airDps = unitData[unit.toLowerCase()]['airDps'];
        let output: string = "the " + unit.toLowerCase();
        self.emit(":tellWithCard", output, "Unit Damage Intent", output);
      }
    };
    alexa.registerHandlers(handlers);
    alexa.execute();
  }
}