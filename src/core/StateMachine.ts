// deno-lint-ignore-file no-explicit-any
import { merge } from "../utils/merge.ts";
import { invokeEach } from "../utils/invokeEach.ts";
import {
  configOpts,
  Context,
  StateMachineConfigurator,
  TriggerConfigurator,
} from "../types/index.ts";
import { TaskScheduler } from "./TaskScheduler.ts";

export default class StateMachine<S, E> {
  #config: StateMachineConfigurator<S, E> | null;
  #taskSchedular: TaskScheduler;
  #contextFactory: Context<S, E>;
  #currentState: S | any;
  #submachines: StateMachine<S, E>[];
  #timerIDs: ReturnType<typeof setTimeout>[] | null;
  #asyncActionCancelers: any;

  constructor(
    config: StateMachineConfigurator<S, E>,
    taskSchedular: TaskScheduler,
    contextFactory: Context<S, E>,
  ) {
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
    this.#taskSchedular = taskSchedular;
    this.#contextFactory = contextFactory;
    this.#submachines = Object.create(null);
    this.#timerIDs = null;
    this.#currentState = null;
    this.#asyncActionCancelers = null;
    this.handleAsyncActionComplete();
    this.handleTimeout();
  }

  getCurrentState(): S | null {
    return this.#currentState;
  }

  canHandle(event: E, eventPayload?: any): boolean {
    if (!this.isStarted) {
      return false;
    }

    const context = this.createContextWithEvent(event, eventPayload);
    return !!this.getFirstAllowedTransitionForEvent(context);
  }

  tryHandle(event: E, eventPayload: any) {
    if (!this.isStarted()) {
      return false;
    }

    const context = this.createContextWithEvent(event, eventPayload);
    const transitionConfig = this.getFirstAllowedTransitionForEvent(context);
    if (transitionConfig) {
      this.executeTransition(transitionConfig, context);
      return false;
    }
    return false;
  }

  //TODO:
  handleUnhandledEvent(event: Event, eventPayload: any) {
    if (this.#config.global.unhandledEventHooks.length > 0) {
      // invokeEach(
      //   this.#config.global.unhandledEventHooks,
      //   event,
      //   this.#currentState,
      //   this.createContextWithEvent(event, eventPayload),
      // );
    } else {
      throw new Error(
        `Unhandled event ${event} in state '${this.#currentState}'`,
      );
    }
  }

  isStarted() {
    return this.#currentState !== null;
  }

  start() {
    if (!this.isStarted()) {
      this.enterState(this.#config.initialState, this.createContext());
    }
  }

  stop() {
    if (this.isStarted()) {
      this.exitState(this.createContext());
      this.#currentState = null;
    }
  }

  //TODO:
  getSubMachine() {
    return this.isStarted() ? this.#submachines[this.#currentState] : null;
  }

  //TODO:
  executeTransition<S, E>(
    transitionConfig: TriggerConfigurator,
    context: Context<S, E>,
  ) {
    if (transitionConfig.ignore) {
      return;
    }

    if (!transitionConfig.internal) {
      this.exitState(context);
    }

    // if(transitionConfig.in)
  }

  //TODO:
  enterState<S, E>(state: S, context: Context<S, E>) {
  }

  //TODO:
  exitState<S, E>(context: Context<S, E>) {
    this.stopSubmachines();
    this.stopTimers();
    this.cancelAsyncAction();

    // invokeEach(this.config.global.stateExitHooks, this.#currentState, context);

    // const stateConfig = this.config.states[this.currentState];
    // if (stateConfig) {
    //   invokeEach(stateConfig.exitActions, this.currentState, context);
    // }
  }

  //TODO:
  startAsyncAction() {}

  //TODO:
  cancelAsyncAction() {}

  //TODO:
  handleAsyncActionComplete() {}

  //TODO:
  startTimers() {}

  stopTimers() {
    if (this.#timerIDs) {
      this.#timerIDs.forEach(clearTimeout);
    }
  }

  //TODO:
  handleTimeout() {}

  stopSubmachines() {
    //TODO:
    //Start from Here
    // const sumMachines = this.#submachines.this.#currentState];
  }

  //TODO:
  static getFirstAllowedTransition<E, S>(
    transitions: any[],
    context: Context<E, S>,
  ) {
    for (let i = 0; i < transitions.length; i++) {
      if (!transitions[i].condition || transitions[i].condition(context)) {
        return transitions;
      }
    }
    return null;
  }

  getFirstAllowedTransitionForEvent<E, S>(context: Context<E, S>) {
    const stateConfig = this.#config.states[this.#currentState];
    if (!stateConfig) {
      return null;
    }

    let transitionConfig = null;

    const eventConfig = stateConfig.events[context.event];

    if (!transitionConfig && stateConfig.anyEventTrigger) {
      transitionConfig = StateMachine.getFirstAllowedTransition(
        stateConfig.anyEventTrigger.transitions,
        context,
      );
    }

    return transitionConfig;
  }

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
