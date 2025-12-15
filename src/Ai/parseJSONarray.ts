export const parseJSONarray = (json: string): unknown[] => {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v : [v];
  } catch (cause: unknown) {
    throw new Error("parseJSONarrayE: JSON Parse Error", { cause });
  }
};
