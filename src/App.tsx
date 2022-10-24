import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import Routes from "./Routes";
import "./App.css";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default App;
