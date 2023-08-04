// Importing Stripe library
import Stripe from "stripe";

// Create a new instance of the Stripe class
// The "STRIPE_API_KEY" environment variable is used as the Stripe API key
// The "apiVersion" is set to "2022-11-15", specifying the Stripe API version to be used
// The "typescript" option is set to "true" to enable TypeScript typings for the Stripe client
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2022-11-15",
    typescript: true
});
