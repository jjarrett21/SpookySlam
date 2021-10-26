/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
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
  const [contestants, setContestants] = useState<DocumentData[]>();
  const getData = async () => {
    const q = query(collection(db, "contestants"));

    const querySnapshot = await getDocs(q);

    // const unsub = onSnapshot(q, (querySnapshot) => {
    //   const data: DocumentData[] = [];
    //   querySnapshot.forEach((doc) => {
    //     data.push(doc.data());
    //   });

    //   setContestants(data);
    //   console.log(contestants);
    // });
    // unsub();
    querySnapshot.forEach((doc) => {
      const docData: DocumentData[] = [];
      docData.push(doc.data());
      setContestants(docData);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(contestants);

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
