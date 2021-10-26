/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { db } from "../firebase/fireabse";
import { collection, query, getDocs, DocumentData } from "firebase/firestore";
import { defaultFontStyle } from "../tokens/functions";
import { Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

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
width: 100%;
height: 100%;
​`;

const baseCardStyles = css`
  background-color: transparent;
  font-family: Spooky;
`;

export const Voting: FC = () => {
  const [contestants, setContestants] = useState<DocumentData[]>([]);
  const docData: DocumentData[] = [];

  const fetchData = async () => {
    const q = query(collection(db, "contestants"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docData.push(doc.data());
    });
    setContestants(docData);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 css={defaultFontStyle}>VOTES GO HERE</h1>
      <div css={wrapperStyles}>
        <Card css={baseCardStyles}>
          {contestants?.map((c) => (
            <div key={`${uuidv4()}`}>
              <Card.Text>Name: {c.name}</Card.Text>
              <Card.Img css={cardStyles(c.url)}>
                {/* <div css={cardStyles(c.url)}>
                  <div css={innerCardStyles} />
                </div> */}
              </Card.Img>

              <Card.Text>Votes: {c.votes}</Card.Text>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

Voting.displayName = "Voting";
