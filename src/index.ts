import { StateMachineConfigurator } from "./configuration/index.ts";
import HierarchicalStateMachine from "./core/HierarchicalStateMachine.ts";

const Finity = {
  configure() {
    return new StateMachineConfigurator();
  },

  start(config) {
    return HierarchicalStateMachine.start(config);
  },
};

export default Finity;
