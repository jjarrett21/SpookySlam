/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FC } from "react";
import "./App.css";
import { MainDashboard } from "./Dashboard";

export const App: FC = () => {
  return (
    <div className="App">
      <MainDashboard />
    </div>
  );
};

App.displayName = "App";
