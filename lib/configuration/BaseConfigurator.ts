// https://github.com/nickuraltsev/finity/blob/b9511fd7ecee23899a9a6348e0a0f323074e5c12/src/configuration/BaseConfigurator.js#L3
export default class BaseConfigurator {
  #parent: unknown;

  constructor(parent: unknown) {
    this.#parent = parent;
  }

  getAncestor(type: InstanceType<never>) {
    if (this.#parent) {
      return this.#parent instanceof type ? this.#parent : this.#parent;
    }
    return null;
  }

  //   buildConfig() {
  //     const mapper = (value) => {
  //       if (!value) {
  //         return value;
  //       }
  //       if (value instanceof BaseConfigurator) {
  //         return value.buildConfig();
  //       }
  //       if (Array.isArray(value)) {
  //         return value.map(mapper);
  //       }
  //       if (value && typeof value === "object") {
  //         return mapValues(value, mapper);
  //       }
  //       return value;
  //     };
  //     return mapValues(this.config, mapper);
  //   }
}
