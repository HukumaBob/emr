import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import "./Patients.css";

const PatientRecord = () => {
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

export default PatientRecord;
