/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FC } from "react";
import { Carousel, Button, ButtonGroup } from "react-bootstrap";

const buttongGroupStyles = css`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
`;

const buttonStyles = css`
  margin: 1rem;
  background-color: #ff8c00;
  border: 1px solid black;

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
    <div>
      <div>
        <Carousel indicators={false}>
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
