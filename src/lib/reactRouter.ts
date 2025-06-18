// Import the generated route tree
import { routeTree } from "./../routeTree.gen.ts";
import { createRouter } from "@tanstack/react-router";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Create a new router instance
const router = createRouter({ routeTree, pathParamsAllowedCharacters: ["$"] });

export default router;
