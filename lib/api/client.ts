import { ZodSchema } from "zod";

export function fetchZodTyped<T>(
  url: string,
  config: RequestInit = {},
  schema: ZodSchema<T>
): Promise<T> {
  // console.log('Url:', url); //For debugging purpose

  const uConfig: RequestInit = {
    ...config,
    headers: { ...config.headers, Accept: "application/json" },
  };

  // console.log('uConfig:', JSON.stringify(uConfig, null, 2)); //For debugging purpose

  return fetch(url, uConfig)
    .then((response) => response.json())
    .then((data) => {
      // console.log("Raw response:", JSON.stringify(data, null, 2)); //For debugging purpose
      const result = schema.safeParse(data);
      if (!result.success) {
        throw new Error(`Validation error: ${result.error.message}`);
      }
      return result.data;
    });
}
