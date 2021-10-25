import { css } from "@emotion/react";
import { gradient } from "./tokens/functions";

export const globalStyle = css`
  html,
  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background: ${gradient("#9c9b98", " #ff8c00")};
  }

  html {
    overflow: hidden;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export const hideScrollbars = css`
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;