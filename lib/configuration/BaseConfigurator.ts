// deno-lint-ignore-file

import mapValues from "../utils/mapValues.ts";

export default class BaseConfigurator {
  #parent: BaseConfigurator;
  public config: Record<string, unknown> = {};

  constructor(parent: BaseConfigurator) {
    this.#parent = parent;
  }

  getAncestor(type: InstanceType<never>): BaseConfigurator | null {
    if (this.#parent) {
      return this.#parent instanceof type
        ? this.#parent
        : this.#parent.getAncestor(type);
    }
    return null;
  }

  buildConfig() {
    function mapper(
      value: any,
    ): Record<string, unknown> | void | unknown {
      if (!value) {
        return value;
      }
      if (value instanceof BaseConfigurator) {
        return value.buildConfig();
      }
      if (Array.isArray(value)) {
        return value.map(mapper);
      }
      if (value && typeof value === "object") {
        return mapValues(value, mapper);
      }
      return value;
    }
    return mapValues(this.config, mapper);
  }
}
