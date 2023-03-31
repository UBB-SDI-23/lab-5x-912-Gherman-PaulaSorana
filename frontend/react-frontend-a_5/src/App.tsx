import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { SwimmerShowAll } from "./components/swimmers/SwimmerShowAll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (

    <React.Fragment>
      <Router>
              <Routes>
                      <Route path="/swimmers" element={<SwimmerShowAll />} />
              </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
