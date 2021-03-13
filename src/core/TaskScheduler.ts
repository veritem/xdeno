type FuncParams = {
  task: () => void;
};

export class TaskScheduler {
  queue: FuncParams[] = [];
  isBusy = false;

  enqueue(task: FuncParams) {
    if (this.isBusy) {
      this.queue.push(task);
    } else {
      this.execute(task);
    }
  }

  execute(task: FuncParams) {
  }
  //   enqueue(task: string) {
  //     if (this.isBusy) {
  //       throw new Error(
  //         "Can not execute task because another task is already running.",
  //       );
  //     }
  //     this.isBusy = true;

  // try {
  //   task();
  // } finally {
  //   if (this.queue.length > 0) {
  //     this.queue = [];
  //   }
  //   this.isBusy = false;
  // }
}
