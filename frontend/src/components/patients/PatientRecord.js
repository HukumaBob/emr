import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { initialRecordState } from "../../slices/recordForm/patientReducer";
import { loadRecord } from "../../slices/recordForm/loadRecord";

const PatientRecord = () => {
  const dispatch = useDispatch();
  const record = useSelector((state) => state.recordForm.patient);
  const [lastRecordId, setLastRecordId] = useState(null);

  useEffect(() => {
    if (record && record.id !== lastRecordId) {
      dispatch(loadRecord(record.id));
      setLastRecordId(record.id);
    }
  }, [record, dispatch, lastRecordId]);

  if (!record) {
    return <div>Запись не выбрана</div>;
  }

  const { findings } = record;

  const renderFields = (fields, level = 0) => {
    if (typeof fields === "string" && fields.trim() !== "") {
      return <div style={{ marginLeft: `${level * 20}px` }}>{fields}</div>;
    }

    return Object.keys(fields).map((field) => {
      let value = fields[field];
      if (typeof value === "string") {
        return (
          <div key={field} style={{ marginLeft: `${level * 20}px` }}>
            <b>{field.replace(/_/g, " ")}:</b> {value.replace(/_/g, " ")}
          </div>
        );
      } else if (Array.isArray(value) && value.length === 0) {
        return null;
      } else if (typeof value === "object" && value !== null) {
        const childFields = renderFields(value, level + 1);
        if (childFields.length > 0) {
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
    <Card>
      <Card.Header>
        <Card.Title>{record.record_type_name.name}</Card.Title>
      </Card.Header>
      <Card.Body>{renderFindings(findings)}</Card.Body>
    </Card>
  );
};

export default PatientRecord;
