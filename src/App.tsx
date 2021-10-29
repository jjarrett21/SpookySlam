/** @jsx jsx */
import { Global, jsx } from "@emotion/react";
import { FC } from "react";
import "./App.css";
import { MainDashboard } from "./Dashboard";
import { Results, Voting } from "./Voting";
import { HashRouter as Router, Route } from "react-router-dom";
import { globalStyle } from "./global";

export const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Global styles={globalStyle} />
        <Route exact path="/" component={MainDashboard} />
        <Route path="/voting" component={Voting} />
        <Route path="/results" component={Results} />
      </Router>
    </div>
  );
};

App.displayName = "App";
