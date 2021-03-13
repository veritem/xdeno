import BaseConfigurator from "./BaseConfigurator.ts";

export default class StateMachineConfigurator extends BaseConfigurator {
  //   constructor() {
  // super(d);
  //   }

  global() {
    return this.config;
  }
}
