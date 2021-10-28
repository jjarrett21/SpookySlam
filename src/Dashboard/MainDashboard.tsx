/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { Carousel, Button, ButtonGroup, FormLabel } from "react-bootstrap";
import { storage, db } from "../firebase/fireabse";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { defaultFontStyle } from "../tokens/functions";
import heic2any from "heic2any";

const wrapperStyles = css`
position: absolute;
top: 20%;
margin-top: -50px;
width: 100vw;
height: 100vh;
​`;

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

  const [contestantName, setContestantName] = useState("");

  let tempUrl = "";

  const handleAddFile = (event: SyntheticEvent) => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    setFile(input.files[0]);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContestantName(event.currentTarget.value);
  };

  const handleFirestoreUpload = async () => {
    try {
      const docRef = await addDoc(collection(db, "contestants"), {
        name: contestantName,
        votes: 0,
        url: url,
      });
      console.log(docRef.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = async () => {
    let maybeFile = file;

    if (!maybeFile) {
      return;
    }

    var resultFile = file!

    if (maybeFile.name.toLowerCase().endsWith(".heic")) {
      let fileUrl = URL.createObjectURL(maybeFile);

      let blobRes = await fetch(fileUrl);

      let blob = await blobRes.blob();

      let conversionResult = await heic2any({
        blob,
        toType: "image/jpeg",
        quality: 0.75
      });

      let fileName = resultFile.name.replace(".HEIC", ".jpeg");

      resultFile = new File([conversionResult as BlobPart], fileName, {type: "image/jpeg", lastModified: Date.now()});
    }

    const storageRef = ref(storage, `/images/${contestantName}`);
    const uploadTask = uploadBytesResumable(storageRef, resultFile);
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
          tempUrl = downloadURL;
        });
        setUrl(tempUrl);
        setContestantName("");
        setFile(undefined);
      }
    );
  };

  useEffect(() => {
    if (url === "" || contestantName === "") {
      return;
    }
    handleFirestoreUpload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handleUpload = async () => {
    await handleFileUpload();
  };

  return (
    <div css={wrapperStyles}>
      <h1 css={defaultFontStyle}>Spooky Slam</h1>
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
              <input type="file" onChange={handleAddFile} />
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
        <input type="text" onChange={handleNameChange} value={contestantName} />
      </div>
    </div>
  );
};

MainDashboard.displayName = "MainDashboard";
