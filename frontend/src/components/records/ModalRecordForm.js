import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/material-ui";

const ModalRecordForm = () => {
  const schema = useSelector((state) => state.schema.currentSchema);
  const formOpen = useSelector((state) => state.schema.formOpen);

  if (!formOpen) {
    return null;
  }

  const onSubmit = ({ formData }, e) =>
    console.log("Data submitted: ", formData);

  // Добавляем свойство ui:grid в схему
  const uiSchema = {
    "ui:grid": {
      "ui:grid.templateColumns": "1fr 1fr",
      "ui:grid.gap": "10px",
    },
  };

  return (
    <Card style={{ backgroundColor: "DarkGrey", width: "100%" }}>
      <Card.Body>
        <Form
          schema={schema.schema}
          uiSchema={uiSchema}
          onSubmit={onSubmit}
          validator={validator}
        />
      </Card.Body>
    </Card>
  );
};

export default ModalRecordForm;
