export async function delay(value: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, value));
}

export function toModel<T extends Record<string, any>>(
  object: Record<string, any>
): T {
  let model: T = {} as T;

  for (const [key, value] of Object.entries(object)) {
    model = { ...model, [key]: value };
  }

  return model;
}
