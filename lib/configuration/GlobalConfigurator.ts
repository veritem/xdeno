import BaseConfigurator from "./BaseConfigurator.ts";
import { StateHook } from "../types.ts";

export default class GlobalConfigurator extends BaseConfigurator {
  constructor(parent: BaseConfigurator) {
    super(parent);
    this.config = {
      stateEnterHooks: [],
      stateExitHooks: [],
      stateChangeHooks: [],
      transitionHooks: [],
      unhandledEventHooks: [],
    };
  }

  //   onStateEnter(hook: StateHook): GlobalConfigurator {
  //     this.config.stateChangeHooks.push(hook);
  //     return this;
  //   }

  //   onStateExit(hook: StateHook): GlobalConfigurator {
  //     this.config.stateExitHooks.push(hook);
  //     return this;
  //   }

  //   onStateChange(hook: StateHook): GlobalConfigurator {
  //     this.config.stateChangeHooks.push(hook);
  //     return this;
  //   }

  //   onTransition(hook: StateHook): GlobalConfigurator {
  //     this.config.transitionHooks.push(hook);
  //     return this;
  //   }

  //   onUnhandledEvent(hook): GlobalConfigurator {
  //     this.config.unhandledEventHooks.push(hook);
  //     return this;
  //   }
}
