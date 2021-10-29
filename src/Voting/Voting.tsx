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
  updateDoc,
  increment,
  doc,
} from "firebase/firestore";
import { defaultFontStyle } from "../tokens/functions";
import { ButtonGroup, Card, Modal, Button } from "react-bootstrap";
import { get as lsGet, set as lsSet } from "local-storage";

const cardStyles = (url: string) => css`
  background-color: #ffffff;
  position: relative;
  cursor: pointer;
  height: 500px;
  width: 20rem;
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
position: relative;
top: 20%;
width: 100%;
height: 60%;
align-items: center;
margin-left: auto;
margin-right: auto;
margin-top: 60px;
​`;

const baseCardStyles = css`
  background-color: transparent;
  font-family: Spooky;
  align-items: center;
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
  position: fixed;
  color: #ffc800;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  .modal-content {
    background-color: #000;
  }
`;

export const Voting: FC = () => {
  const [contestants, setContestants] = useState<DocumentData[]>([]);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [selectedContestant, setSelectedContestant] = useState("");
  const [selectedContestantId, setSelectedContestantId] = useState(null);
  const [open, setOpen] = useState(false);

  const docData: DocumentData[] = [];
  const docIds: string[] = [];
  const votingRef = doc(db, "contestants", `${selectedContestantId}`);

  const canOpen = open && hasVoted === false;

  const fetchData = async () => {
    const q = query(collection(db, "contestants"), orderBy("name"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docIds.push(doc.id);
      docData.push(doc.data());
      docData.forEach((item, i) => {
        item.id = docIds[i];
      });
    });

    setContestants(docData);
  };

  const handleSelectedContestant =
    (nextContestant: DocumentData) => (e: SyntheticEvent) => {
      setSelectedContestant(nextContestant.name);
      setSelectedContestantId(nextContestant.id);
      setOpen(true);
    };

  const handleVoteSubmit = async () => {
    setOpen(false);
    setHasVoted(!hasVoted);

    await updateDoc(votingRef, {
      votes: increment(1),
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const voted = lsGet<boolean>("user_voted");
    setHasVoted(voted);
  }, []);

  useEffect(() => {
    if (!hasVoted) {
      return;
    }
    lsSet("user_voted", hasVoted.toString());
  }, [hasVoted]);

  return (
    <div>
      {!contestants.length ? (
        <h1 className="vote-title" css={defaultFontStyle}>
          No contestants yet.
        </h1>
      ) : (
        <div>
          <h1 className="vote-title" css={defaultFontStyle}>
            Vote for your favorite
          </h1>
          <h4 className="vote-title" css={defaultFontStyle}>
            {hasVoted && "Thanks For Voting; We'll have results soon"}
          </h4>
          <div css={wrapperStyles}>
            {contestants?.map((c) => (
              <Card
                css={baseCardStyles}
                onClick={handleSelectedContestant(c)}
                key={c.id}
              >
                <div key={c.id}>
                  <Card.Text css={cardTextStyles}>Name: {c.name}</Card.Text>
                  <Card.Text>Votes: {c.votes}</Card.Text>
                  <Card.Img css={cardStyles(c.url)} />
                </div>
              </Card>
            ))}
          </div>

          <Modal css={modalStyle} show={canOpen} animation={false}>
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
      )}
    </div>
  );
};

Voting.displayName = "Voting";
