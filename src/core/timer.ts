export async function timeExecution<T>(
  fn: () => T | Promise<T>
): Promise<{ result: T; ms: number }> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  return { result, ms: end - start };
}
