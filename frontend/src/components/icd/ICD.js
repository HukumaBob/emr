import Card from "react-bootstrap/Card";
import React from "react";
import * as ECT from "@whoicd/icd11ect";
import "@whoicd/icd11ect/style.css";
import "./ICD.css";
const ICD = () => {
  const mySettings = {
    apiServerUrl: "http://localhost:6382",
    // apiServerUrl: "https://icd11restapi-developer-test.azurewebsites.net",
    apiSecured: false,
  };
  ECT.Handler.configure(mySettings);
  return (
    <Card className="m-1">
      <Card.Body>
        <Card.Title>ICD-11</Card.Title>
        <div
          className="ctw-eb-window my-custom-background"
          data-ctw-ino="1"
        ></div>
      </Card.Body>
    </Card>
  );
};

export default ICD;
