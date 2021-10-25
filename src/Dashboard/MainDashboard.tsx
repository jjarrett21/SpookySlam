/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import { Carousel, Button, ButtonGroup, FormLabel } from "react-bootstrap";
import { storage, db } from "../firebase/fireabse";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

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

const inputWrapperStyles = css`
  display: flex;
  justify-content: center;
  font-family: Spooky;
`;

export const MainDashboard: FC = () => {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, setProgress] = useState(0);

  const [fileName, setFileName] = useState("");

  const handleChange = (event: SyntheticEvent) => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    setFile(input.files[0]);

    let maybeFile = file;

    if (!maybeFile) {
      return;
    }

    const storageRef = ref(storage, `/images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file!);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const nextProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(nextProgress);
      },
      (error) => {
        console.error(error.message);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.currentTarget.value);
  };

  const handleFirestoreUpload = async () => {
    try {
      const docRef = await addDoc(collection(db, "contestants"), {
        name: fileName,
        votes: 0,
        url: url,
      });
      console.log(docRef.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpload = async () => {
    await handleFirestoreUpload();
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
            as={Link as any}
            to={"/voting"}
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
      <div css={inputWrapperStyles}>
        <FormLabel css={inputWrapperStyles}>Contestant Name: </FormLabel>
        <input type="text" onChange={handleNameChange} />
      </div>
    </div>
  );
};

MainDashboard.displayName = "MainDashboard";
