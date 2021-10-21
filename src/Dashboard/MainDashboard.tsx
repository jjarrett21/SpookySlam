/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FC } from "react";
import { Carousel, Button, ButtonGroup } from "react-bootstrap";

const wrapperStyles = css`

position: absolute;
top: 20%;
margin-top: -50px;
width: 100%;
height: 100%;
​`;

const headerStyles = css`
  font-family: Spooky;
`;

const buttongGroupStyles = css`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
`;

const buttonStyles = css`
  margin: 1rem;
  background-color: #ff8c00;
  color: black;
  border: 1px solid black;
  font-family: Spooky;

  &.btn-primary {
    &:active {
      background-color: #ff8c00;
      opacity: 0.5;
    }

    &:hover {
      background-color: #ff8c00;
      opacity: 0.5;
    }

    &:active {
      background-color: #ff8c00;
      opacity: 1;
    }

    &:after {
      background-color: ff8c00;
    }
  }
`;

export const MainDashboard: FC = () => {
  const handleSelectVoting = () => {
    console.log("vote");
  };

  const handleSelectUpload = () => {
    console.log("upload");
  };

  return (
    <div css={wrapperStyles}>
      <h1 css={headerStyles}>Spooky Slam</h1>

      <div>
        <Carousel indicators={false} controls={false}>
          <Carousel.Item>
            <img
              className="spooky-slam-header"
              src="../../big_spooky.png"
              alt="Big Spooky"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div css={buttongGroupStyles}>
        <ButtonGroup vertical>
          <Button
            size="lg"
            color="#FFA500"
            css={buttonStyles}
            onClick={handleSelectVoting}
          >
            Vote
          </Button>
          <Button
            size="lg"
            color="FFA500"
            css={buttonStyles}
            onClick={handleSelectUpload}
          >
            Upload Photos
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
