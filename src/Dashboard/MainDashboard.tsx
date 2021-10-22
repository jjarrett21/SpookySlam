/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FC, SyntheticEvent, useState } from "react";
import { Carousel, Button, ButtonGroup } from "react-bootstrap";
import { storage } from "../firebase/fireabse";
import { ref, uploadBytes } from "firebase/storage";

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
  border: 3px solid black;
  font-family: Spooky;

  &.btn-primary {
    &:active {
      background-color: #ff8c00;
      opacity: 0.5;
    }

    &:hover {
      background-color: #ff8c00;
      opacity: 0.5;
  

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
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSelectVoting = () => {
    console.log("vote");
  };

  const handleSelectUpload = () => {
    console.log("upload");
  };

  const handleChange = (event: SyntheticEvent) => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    setFile(input.files[0]);
  };

  const handleUpload = () => {
    let maybeFile = file;

    if (!maybeFile) {
      return;
    }

    const storageRef = ref(storage, `/images/${maybeFile?.name}`);
    uploadBytes(storageRef, maybeFile).then((snapshot) => {
      console.log(snapshot);
    });
  };

  return (
    <div css={wrapperStyles}>
      å<h1 css={headerStyles}>Spooky Slam</h1>
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
          <ButtonGroup>
            <Button size="lg" color="#FFA500" css={buttonStyles}>
              <input type="file" onChange={handleChange} />
            </Button>

            <Button
              size="lg"
              color="#FFA500"
              css={buttonStyles}
              onClick={handleUpload}
            >
              Upload Photos
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    </div>
  );
};
