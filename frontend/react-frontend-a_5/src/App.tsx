import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { SwimmerShowAll } from "./components/swimmers/SwimmerShowAll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SwimmerDetails } from "./components/swimmers/SwimmerDetails";
import { AppMenu } from "./components/AppMenu";
import { SwimmerAdd } from "./components/swimmers/SwimmerAdd";
import { AppHome } from "./components/AppHome";

function App() {
  const [count, setCount] = useState(0);

  return (

    <React.Fragment>
      <Router>
              <AppMenu />

              <Routes>
                      <Route path="/" element={<AppHome />} />
                      <Route path="/swimmers/add" element={<SwimmerAdd />} />
                      <Route path="/swimmers" element={<SwimmerShowAll />} />
                      <Route path="/swimmers/:swimmerId" element={<SwimmerDetails />} />
                      
              </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
