import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useReducer, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeForm } from "../../slices/recordFormSlice";
import { createRecord } from "../../slices/recordForm/createRecord";
import { deleteRecord } from "../../slices/recordForm/deleteRecord";
import { deletePhotoRecord } from "../../slices/recordForm/deletePhotoRecord";
import { updateRecord } from "../../slices/recordForm/updateRecord";
import { fetchRecords } from "../../slices/recordsSlice";
import "./recordForm.css";
import {
  initialRecordState,
  recordReducer,
} from "../../slices/recordForm/recordReducer";

const RecordForm = () => {
  const record = useSelector((state) => state.recordForm.record);

  if (!record) {
    return (
      <Card className="card-height">
        <Card.Header>
          <Card.Title>Запись не выбрана</Card.Title>
        </Card.Header>
        <Card.Body className="card-content"></Card.Body>
      </Card>
    );
  }

  const { findings } = record;

  const renderFields = (fields, level = 0) => {
    if (typeof fields === "string" && fields.trim() !== "") {
      return <div style={{ marginLeft: `${level * 20}px` }}>{fields}</div>;
    }

    return Object.keys(fields).map((field) => {
      let value = fields[field];
      if (typeof value === "string" && value.trim() !== "") {
        return (
          <div key={field} style={{ marginLeft: `${level * 20}px` }}>
            <b>{field.replace(/_/g, " ")}:</b> {value.replace(/_/g, " ")}
          </div>
        );
      } else if (typeof value === "number") {
        return (
          <div key={field} style={{ marginLeft: `${level * 20}px` }}>
            <b>{field.replace(/_/g, " ")}:</b> {value}
          </div>
        );
      } else if (Array.isArray(value) && value.length === 0) {
        return null;
      } else if (typeof value === "object" && value !== null) {
        const childFields = renderFields(value, level + 1);
        if (childFields.filter((child) => child !== null).length > 0) {
          return (
            <div key={field} style={{ marginLeft: `${level * 20}px` }}>
              <b>{field.replace(/_/g, " ")}</b>
              {childFields}
            </div>
          );
        }
      }
      return null;
    });
  };

  const renderFindings = (findings) => {
    const sections = Object.keys(findings);
    return sections.map((section) => {
      const fields = findings[section];
      return (
        <Card key={section}>
          <Card.Header>{section.replace(/_/g, " ")}</Card.Header>
          <Card.Body>{renderFields(fields)}</Card.Body>
        </Card>
      );
    });
  };

  return (
    <Card className="card-height">
      <Card.Header>
        <Card.Title>{record.record_type_name.name}</Card.Title>
      </Card.Header>
      <Card.Body className="card-content">{renderFindings(findings)}</Card.Body>
    </Card>
  );
};

export default RecordForm;
