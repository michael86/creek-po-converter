import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen.ts";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "./store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/reactQueryClient";

// Create a new router instance
const router = createRouter({ routeTree, pathParamsAllowedCharacters: ["$"] });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
