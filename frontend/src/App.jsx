import { useState } from "react";

import "./App.css";
import LoginLayout from "./Pages/Login/LoginLayout";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import RouterConfig from "./Routes/RouterConfig";

function App() {
  return (
    <BrowserRouter>
        <RouterConfig />
    </BrowserRouter>
  );
}

export default App;
