import StateMachineConfigurator from "./StateMachineConfigurator.ts";
import GlobalConfigurator from "./GlobalConfigurator.ts";
import StateConfigurator from "./StateConfigurator.ts";
import TriggerConfigurator from "./TriggerConfigurator.ts";
import TransitionConfigurator from "./TransitionConfigurator.ts";
import AsyncActionConfigurator from "./AsyncActionConfigurator.ts";
import delegateToAncestor from "./delegateToAncestor.ts";

export { StateMachineConfigurator };

delegateToAncestor(GlobalConfigurator, StateMachineConfigurator);
delegateToAncestor(StateConfigurator, StateMachineConfigurator);
delegateToAncestor(TransitionConfigurator, StateConfigurator);
delegateToAncestor(TransitionConfigurator, TriggerConfigurator);
delegateToAncestor(TransitionConfigurator, AsyncActionConfigurator);
