import { merge } from "../utils/merge.ts";
import { invokeEach } from "../utils/invokeEach.ts";
import { Context } from "../types/index.ts";

export default class StateMachine<S, E> {
  #config: any;
  #taskSchedular: any;
  #contextFactory: Context<S, E>;
  #currentState: S | null;
  #submachines: any;
  #timerIDs: any;
  #asyncActionCancelers: any;

  //https://github.com/nickuraltsev/finity/blob/b9511fd7ecee23899a9a6348e0a0f323074e5c12/src/core/StateMachine.js#L7

  constructor(config: any, contextFactory: Context<S, E>) {
    if (config === undefined || config === null) {
      throw new Error("Configuration must be specified.");
    }

    if (typeof config !== "object") {
      throw new Error("Configuration must be an object.");
    }
    if (config.initialState === undefined || config.initialState === null) {
      throw new Error("Initial state must be specified.");
    }

    this.#config = config;
    // this.#taskSchedular = taskSchedular;
    this.#contextFactory = contextFactory;
    this.#submachines = Object.create(null);
    this.#timerIDs = null;
    this.#currentState = null;
    this.#asyncActionCancelers = null;
    // this.handleAsyncActionComplete = ::this.handleAsyncActionComplete;
    // this.handleTimeout = ::this.handleTimeout;
  }

  getCurrentState(): S | null {
    return this.#currentState;
  }

  //TODO:
  canHandle(event: E, eventPayload?: any): boolean {
    if (!this.isStarted) {
      return false;
    }

    const context = this.createContextWithEvent(event, eventPayload);
    // return !!this.getFirstAllowedTransitionForEvent(context);
    return false;
  }

  //TODO:
  tryHandle() {}

  //TODO:
  handleUnhandledEvent() {}

  //TODO:
  isStarted() {}

  //TODO:
  start() {}

  //TODO:
  stop() {}

  //TODO:
  getSubMachine() {}

  //TODO:
  executeTransition() {}

  //TODO:
  enterState() {}

  //TODO:
  exitState() {}

  //TODO:
  startAsyncAction() {}

  //TODO:
  cancelAsyncAction() {}

  //TODO:
  handleAsyncActionComplete() {}

  //TODO:
  startTimers() {}

  //TODO:
  stopTimers() {}

  //TODO:
  handleTimeout() {}

  //TODO:
  stopSubmachines() {}

  //TODO:
  static getFirstAllowedTransition() {}

  //TODO:
  // getFirstAllowedTransition(transition: any[], context: Context<E, S>): any {
  //   for (let i = 0; i < transitions.length; i++) {
  //     if (!transitions[i].condition || transitions[i].condition(context)) {
  //       return transitions[i];
  //     }
  //   }
  //   return null;
  // }

  // getFirstAllowedTransitionForEvent(context: Context<E, S>) {
  //   const stateConfig = this.#config.states[this.#currentState];
  //   if (!stateConfig) {
  //     return null;
  //   }

  //   let transitionConfig = null;

  //   const eventConfig = stateConfig.events[context.event];

  //   if (eventConfig) {
  //     transitionConfig = StateMachine.getFirstAllowedTransition(
  //       eventConfig.transitions,
  //       context,
  //     );
  //   }
  // }

  //TODO:
  executeTrigger() {}

  createContext() {
    //TODO: handle biding here
    return this.#contextFactory;
  }

  createContextWithEvent(event: E, eventPayload?: any) {
    const context = this.createContext();
    context.event = event;
    if (eventPayload !== undefined) {
      context.eventPayload = eventPayload;
    }
    return context;
  }
}
