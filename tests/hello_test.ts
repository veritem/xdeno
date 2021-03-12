import { assertEquals } from "../deps.ts";

Deno.test("hello world #1", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

Deno.test({
  name: "hello world #2",
  fn: () => {
    const x = 1 + 2;
    assertEquals(x, 3);
  },
});
