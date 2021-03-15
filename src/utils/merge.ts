export function merge(
  target: Record<string, string>,
  source: Record<string, string>,
) {
  Object.keys(source).forEach((key) => {
    target[key] = source[key];
  });
  return target;
}
