export default function mapValues(
  obj: Record<string, unknown>,
  cb: (value: unknown) => unknown,
) {
  let result: Record<string, unknown>;

  Object.keys(obj).forEach((key) => {
    return result[key] = cb(obj[key]);
  });
}
