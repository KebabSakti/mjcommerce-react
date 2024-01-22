export async function delay(value: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, value));
}
