/** @jsx jsx */
import { Global, jsx } from "@emotion/react";
import { FC } from "react";
import "./App.css";
import { MainDashboard } from "./Dashboard";
import { globalStyle } from "./global";

export const App: FC = () => {
  return (
    <div className="App">
      <Global styles={globalStyle} />
      <MainDashboard />
    </div>
  );
};

App.displayName = "App";
