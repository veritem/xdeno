import type { TaskParameter } from "../types/index.ts";

export class TaskScheduler {
  #queue: TaskParameter[] = [];
  #isBusy = false;

  enqueue(task: TaskParameter) {
    if (this.#isBusy) {
      this.#queue.push(task);
    } else {
      this.execute(task);
    }
  }

  execute(task: TaskParameter) {
    if (this.#isBusy) {
      throw new Error(
        "Can not execute task because another task is already running.",
      );
    }
    this.#isBusy = true;

    try {
      task();
      while (this.#queue.length > 0) {
        const nextTask = this.#queue.shift() as TaskParameter;
        nextTask();
      }
    } finally {
      // this cleanup the queue
      if (this.#queue.length > 0) {
        this.#queue = [];
      }
      this.#isBusy = false;
    }
  }
}
