import * as Alexa from "alexa-sdk";

export class Handler {

  constructor(event: Alexa.RequestBody, context: Alexa.Context, callback: Function) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.8bf5b4cf-73a9-446c-9169-57abbbd87101";

    let unitData = require("./data/unit-data.json");

    let handlers: Alexa.Handlers = {
      "LaunchRequest": function () {
        let self: Alexa.Handler = this;
        self.emit("AMAZON.HelpIntent");
      },
      "UnitDataIntent": function () {
        let self: Alexa.Handler = this;
        let intentRequest = <Alexa.IntentRequest>self.event.request;
        let unitName: string = <string>intentRequest.intent.slots.Unit.value;
        let unit = unitData[unitName.toLowerCase()];
        if (unit) {
          let output: string = "What would you like to know about the " + unitName.toLowerCase() + "? I can tell you its damage or DPS";
          self.emit(":tellWithCard", output, "Unit Data Intent", output);
        } else {
          // unit was not found
          let output: string = "I'm not sure about that unit... What unit would you like to know about?";
        }
      },
      "UnitDpsIntent": function () {
        let self: Alexa.Handler = this;
        let intentRequest = <Alexa.IntentRequest>self.event.request;
        let unit: string = <string>intentRequest.intent.slots.Unit.value;
        let groundDps = unitData[unit.toLowerCase()]["groundDps"];
        let airDps = unitData[unit.toLowerCase()]["airDps"];
        let output: string = "The " + unit.toLowerCase() + " does ";
        if (groundDps === airDps) {
          output += groundDps + " DPS to both air and ground";
        } else {
          if (groundDps !== "-") {
            output += groundDps + " DPS to ground";
          }
          if (groundDps !== "-" && airDps !== "-") {
            output += " and ";
          }
          if (airDps !== "-") {
            output += airDps + " DPS to air";
          }
        }
        self.emit(":tellWithCard", output, "Unit DPS Intent", output);
      },
      "UnitDamageIntent": function () {
        let self: Alexa.Handler = this;
        let intentRequest = <Alexa.IntentRequest>self.event.request;
        let unit: string = <string>intentRequest.intent.slots.Unit.value;
        let groundDamage = unitData[unit.toLowerCase()]["groundDamage"];
        let airDamage = unitData[unit.toLowerCase()]["airDamage"];
        let output: string = "The " + unit.toLowerCase() + " does ";
        if (groundDamage !== "-") {
          output += groundDamage + " damage to ground";
        }
        if (groundDamage !== "-" && airDamage !== "-") {
          output += " and ";
        }
        if (airDamage !== "-") {
          output += airDamage + " damage to air";
        }
        self.emit(":tellWithCard", output, "Unit Damage Intent", output);
      },
      "AMAZON.HelpIntent": function () {
        let self: Alexa.Handler = this;
        let output = "You can say tell me about a Starcraft 2 unit... What can I help you with?";
        let reprompt = "What can I help you with?";
        self.emit(":ask", output, reprompt);
      },
      "AMAZON.CancelIntent": function () {
        let self: Alexa.Handler = this;
        self.emit(":tell", "Goodbye! Good luck, have fun!");
      },
      "AMAZON.StopIntent": function () {
        let self: Alexa.Handler = this;
        self.emit(":tell", "Goodbye! Good luck, have fun!");
      }
    };
    alexa.registerHandlers(handlers);
    alexa.execute();
  }
}