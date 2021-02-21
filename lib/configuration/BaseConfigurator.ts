export default class BaseConfigurator {
  #parent: unknown;

  constructor(parent: unknown) {
    this.#parent = parent;
  }

  getAncestor(type: any) {
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
