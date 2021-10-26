/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { db } from "../firebase/fireabse";
import {
  collection,
  query,
  getDocs,
  DocumentData,
  orderBy,
} from "firebase/firestore";
import { defaultFontStyle } from "../tokens/functions";
import { ButtonGroup, Card, Modal, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { get as lsGet, set as lsSet } from "local-storage";

const cardStyles = (url: string) => css`
  background-color: #ffffff;
  position: relative;
  cursor: pointer;
  height: 500px;
  width: 400px;
  border-radius: 3px;
  border: 2px solid black;

  font-family: Spooky;

  background-image: url(${url});
  background-position: center center;
  background-size: 100%;
  background-color: transparent;
  background-repeat: no-repeat;
  box-shadow: -4px 0px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #ffc800;
  }
`;

const wrapperStyles = css`
position: absolute;
top: 20%;
margin-top: -50px;
width: 40%;
height: 60%;
​`;

const baseCardStyles = css`
  background-color: transparent;
  font-family: Spooky;
  left: 500px;
`;

const cardTextStyles = css`
  margin: 0;
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

const modalTxtStyles = css`
  text-align: center;
`;

const modalStyle = css`
  color: #ffc800;
  .modal-content {
    background-color: #000;
  }
`;

export const Voting: FC = () => {
  const [contestants, setContestants] = useState<DocumentData[]>([]);
  const [hasVoted, setHasVoted] = useState<boolean>(
    lsGet("user_voted") === "false"
  );
  const [selectedContestant, setSelectedContestant] = useState("");
  const [open, setOpen] = useState(false);
  const docData: DocumentData[] = [];

  const fetchData = async () => {
    const q = query(collection(db, "contestants"), orderBy("name"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docData.push(doc.data());
    });
    setContestants(docData);
  };

  const handleSelectedContestant =
    (nextName: string) => (e: SyntheticEvent) => {
      setSelectedContestant(nextName);
      setOpen(true);
    };

  const handleVoteSubmit = () => {
    setOpen(false);
    setHasVoted(true);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    lsSet("user_voted", hasVoted.toString());
  }, [hasVoted]);

  return (
    <div>
      <h1 css={defaultFontStyle}>Vote for your favorite</h1>
      {/* <h4 css={defaultFontStyle}>**Only vote once please**</h4> */}
      <div css={wrapperStyles}>
        {contestants?.map((c) => (
          <Card css={baseCardStyles} onClick={handleSelectedContestant(c.name)}>
            <div key={`${uuidv4()}`}>
              <Card.Text css={cardTextStyles}>Name: {c.name}</Card.Text>
              <Card.Text>Votes: {c.votes}</Card.Text>
              <Card.Img css={cardStyles(c.url)} />
            </div>
          </Card>
        ))}
      </div>

      <Modal css={modalStyle} show={open && lsGet("user_voted") === "false"}>
        <Modal.Header
          css={[defaultFontStyle, modalTxtStyles]}
          onHide={() => setOpen(false)}
        >
          Submit Vote
        </Modal.Header>
        <Modal.Title css={[defaultFontStyle, modalTxtStyles]}>
          {`Would you like to vote for ${selectedContestant} ? `}{" "}
        </Modal.Title>
        <Modal.Body>
          <ButtonGroup css={buttongGroupStyles}>
            <Button css={buttonStyles} onClick={handleVoteSubmit}>
              Submit Vote
            </Button>
            <Button css={buttonStyles} onClick={() => setOpen(false)}>
              Nah
            </Button>
          </ButtonGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
};

Voting.displayName = "Voting";
