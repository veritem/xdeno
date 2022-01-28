import BaseConfigurator from "./BaseConfigurator.ts";
import GlobalConfigurator from "./GlobalConfigurator.ts";
import StateConfigurator from "./StateConfigurator.ts";
import HierarchicalStateMachine from "../core/HierarchicalStateMachine.ts";

export default class StateMachineConfigurator extends BaseConfigurator {
  constructor() {
    super();
    this.config = {
      global: new GlobalConfigurator(this),
      initialState: null,
      states: Object.create(null),
    };
  }

  global() {
    return this.config.global;
  }

  initialState(state) {
    this.config.initialState = state;
    return this.state(state);
  }

  state(state) {
    if (!this.config.states[state]) {
      this.config.states[state] = new StateConfigurator(this);
    }
    return this.config.states[state];
  }

  getConfig() {
    return this.buildConfig();
  }

  start() {
    const config = this.getConfig();
    return HierarchicalStateMachine.start(config);
  }
}
