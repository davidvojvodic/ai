import * as z from "zod"; // Import the zod library for schema validation

// Define the formSchema using the zod.object() function
export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required", // Error message if the "prompt" field is empty
  }),
});
