/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { db } from "../firebase/fireabse";
import {
  collection,
  query,
  DocumentData,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { defaultFontStyle } from "../tokens/functions";
import { Card } from "react-bootstrap";

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

export const Results: FC = () => {
  const [winner, setWinner] = useState<DocumentData>();

  useEffect(() => {
    const q = query(collection(db, "contestants"), orderBy("votes", "desc"));
    const tempContestants: DocumentData[] = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tempContestants.push(doc.data());
      });
      setWinner(tempContestants[0]);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {!winner ? (
        <h1 className="vote-title" css={defaultFontStyle}>
          No contestants yet.
        </h1>
      ) : (
        <div>
          <h1 className="vote-title" css={defaultFontStyle}>
            And the winner is.....
          </h1>

          <div css={wrapperStyles}>
            <Card css={baseCardStyles}>
              <div>
                <Card.Text css={cardTextStyles}>Name: {winner.name}</Card.Text>
                <Card.Text>Votes: {winner.votes}</Card.Text>
                <Card.Img css={cardStyles(winner.url)} />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

Results.displayName = "Results";
