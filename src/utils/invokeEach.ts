import { InvokeEachParam } from "../types/index.ts";

interface InvokePrams {
  fn: InvokeEachParam[];
  args: string[];
}

export default function invokeEach({ fn, ...args }: InvokePrams) {
  fn.forEach((fn) => fn(args.args));
}
