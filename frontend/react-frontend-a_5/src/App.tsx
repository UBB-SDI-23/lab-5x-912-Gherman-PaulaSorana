import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { SwimmerShowAll } from "./components/swimmers/SwimmerShowAll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SwimmerDetails } from "./components/swimmers/SwimmerDetails";

function App() {
  const [count, setCount] = useState(0);

  return (

    <React.Fragment>
      <Router>
              <Routes>
                      <Route path="/swimmers" element={<SwimmerShowAll />} />
                      <Route path="/swimmers/:swimmerId/details" element={<SwimmerDetails />} />
              </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
