/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { db } from "../firebase/fireabse";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { defaultFontStyle } from "../tokens/functions";
import { Contestant } from "./types";
import { Card } from "react-bootstrap";

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
  }, []);

  return (
    <div>
      <h1 css={defaultFontStyle}>VOTES GO HERE</h1>
      {contestants?.map((c) => (
        <Card key={`${c.name}`}>
          <Card.Title>{c.name}</Card.Title>
          <Card.Img></Card.Img>
          <Card.Text>{c.votes}</Card.Text>
        </Card>
      ))}
    </div>
  );
};

Voting.displayName = "Voting";
