import BaseConfigurator from "./BaseConfigurator.ts";
import TriggerConfigurator from "./TriggerConfigurator.ts";
import TimerConfigurator from "./TimerConfigurator.ts";
import AsyncActionConfigurator from "./AsyncActionConfigurator.ts";

export default class StateConfigurator extends BaseConfigurator {
  constructor(parent) {
    super(parent);
    this.config = {
      entryActions: [],
      exitActions: [],
      events: Object.create(null),
      anyEventTrigger: null,
      timers: [],
      asyncActions: [],
      submachine: null,
    };
  }

  onEnter(action) {
    this.config.entryActions.push(action);
    return this;
  }

  onExit(action) {
    this.config.exitActions.push(action);
    return this;
  }

  on(event) {
    if (!this.config.events[event]) {
      this.config.events[event] = new TriggerConfigurator(this);
    }
    return this.config.events[event];
  }

  onAny() {
    if (!this.config.anyEventTrigger) {
      this.config.anyEventTrigger = new TriggerConfigurator(this);
    }
    return this.config.anyEventTrigger;
  }

  onTimeout(timeout) {
    const timerConfigurator = new TimerConfigurator(this, timeout);
    this.config.timers.push(timerConfigurator);
    return timerConfigurator;
  }

  do(asyncAction) {
    const asyncActionConfigurator = new AsyncActionConfigurator(
      this,
      asyncAction,
    );
    this.config.asyncActions.push(asyncActionConfigurator);
    return asyncActionConfigurator;
  }

  submachine(submachineConfig) {
    this.config.submachine = submachineConfig;
    return this;
  }
}
