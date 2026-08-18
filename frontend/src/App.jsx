import { useState } from "react";
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";

import RouterConfig from "./Routes/RouterConfig";
import LoginLayout from "./Pages/Login/LoginLayout";



function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <RouterConfig />
          <ReactQueryDevtools initialIsOpen={true} />

      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
