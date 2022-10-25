import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import Routes from "./Routes";
import { UserProvider } from "./context/UserContext";
import { ProgressDrawerProvider } from "./context/ProgressDrawerContext";
import "./App.css";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <UserProvider>
          <ProgressDrawerProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </ProgressDrawerProvider>
        </UserProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default App;
