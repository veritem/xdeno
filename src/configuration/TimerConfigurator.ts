import TriggerConfigurator from "./TriggerConfigurator.ts";

export default class TrimerConfigurator extends TriggerConfigurator {
  constructor(parent, timeout) {
    super(parent);
    this.config.timeout = timeout;
  }
}
