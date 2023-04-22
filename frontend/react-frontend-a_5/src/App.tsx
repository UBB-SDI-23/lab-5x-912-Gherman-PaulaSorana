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
import { SwimmerDelete } from "./components/swimmers/SwimmerDelete";
import { SwimmerUpdate } from "./components/swimmers/SwimmerUpdate";
import { TeamsShowOrdSwim } from "./components/swimmers/TeamsShowOrdSwim";
import { TeamAdd } from "./components/teams/TeamAdd";
import { TeamDelete } from "./components/teams/TeamDelete";
import { TeamUpdate } from "./components/teams/TeamUpdate";
import { TeamDetails } from "./components/teams/TeamDetails";
import { CoachAdd } from "./components/coaches/CoachAdd";
import { CoachShowAll } from "./components/coaches/CoachShowAll";
import { CoachDelete } from "./components/coaches/CoachDelete";
import { CoachUpdate } from "./components/coaches/CoachUpdate";
import { CoachDetails } from "./components/coaches/CoachDetails";
import { FanAdd } from "./components/fans/FanAdd";
import { FanShowAll } from "./components/fans/FanShowAll";
import { FanDelete } from "./components/fans/FanDelete";
import { FanUpdate } from "./components/fans/FanUpdate";
import { FanDetails } from "./components/fans/FanDetails";
import { SwimmerFanAdd } from "./components/swimmerfans/SwimmerFanAdd";
import { SwimmerFanShowAll } from "./components/swimmerfans/SwimmerFanShowAll";
import { SwimmerFanDelete } from "./components/swimmerfans/SwimmerFanDelete";
import { SwimmerFanDetails } from "./components/swimmerfans/SwimmerFanDetails";
import { TeamShowAll } from "./components/teams/TeamsShowAll";
import { Statistics } from "./components/Statistics";
import { FanOrdShowAll } from "./components/fans/FanOrdered";
import { SwimmerFilterYoe } from "./components/swimmers/SwimmerFilterYoe";

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
                      <Route path="/swimmers/:swimmerId/delete" element={<SwimmerDelete />} />
                      <Route path="/swimmers/:swimmerId/edit" element={<SwimmerUpdate />} />
                      <Route path="/swimmers/:swimmerId" element={<SwimmerDetails />} />
                      <Route path="/statisticsteam/teamsOrd" element={<TeamsShowOrdSwim />} />
                      <Route path="/allstatistics" element={<Statistics />} />
                      <Route path="/statisticswimmers/swimmerFilter" element={<SwimmerFilterYoe />} />

                      <Route path="/teams/add" element={<TeamAdd />} />
                      <Route path="/teams" element={<TeamShowAll />} />
                      <Route path="/teams/:teamId/delete" element={<TeamDelete />} />
                      <Route path="/teams/:teamId/edit" element={<TeamUpdate />} />
                      <Route path="/teams/:teamId" element={<TeamDetails />} />

                      <Route path="/coaches/add" element={<CoachAdd/>} />
                      <Route path="/coaches" element={<CoachShowAll />} />
                      <Route path="/coaches/:coachId/delete" element={<CoachDelete />} />
                      <Route path="/coaches/:coachId/edit" element={<CoachUpdate />} />
                      <Route path="/coaches/:coachId" element={<CoachDetails />} />

                      <Route path="/fans/add" element={<FanAdd/>} />
                      <Route path="/fans" element={<FanShowAll />} />
                      <Route path="/fans/:fanId/delete" element={<FanDelete />} />
                      <Route path="/fans/:fanId/edit" element={<FanUpdate />} />
                      <Route path="/fans/:fanId" element={<FanDetails />} />
                      <Route path="/statisticsfan/fansOrd" element={<FanOrdShowAll />} />

                      <Route path="/swimmerfans/add" element={<SwimmerFanAdd/>} />
                      <Route path="/swimmerfans" element={<SwimmerFanShowAll />} />
                      <Route path="/swimmerfans/:swimmerfanId/delete" element={<SwimmerFanDelete />} />
                      <Route path="/swimmerfans/:swimmerfanId" element={<SwimmerFanDetails />} />
   
              </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
