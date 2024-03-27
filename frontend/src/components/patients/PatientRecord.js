import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import "./Patients.css";

const PatientRecord = () => {
  const record = useSelector((state) => state.recordForm.record);

  const ImageCardTemplate = ({
    title = null,
    src = null,
    children = null,
    className = null,
  }) => (
    <Card className={className} key={uuid()}>
      {{ title } ? <Card.Header>{title}</Card.Header> : null}
      {{ src } ? <Card.Img variant="top" src={src}></Card.Img> : null}
      {{ children } ? <Card.Body>{children}</Card.Body> : null}
    </Card>
  );

  const ListGroupTemplate = ({ level = 0, title = null, value = null }) => (
    <ListGroup.Item
      key={title}
      variant="flush"
      style={{ marginLeft: `${level * 20}px` }}
    >
      <b>{title.replace(/_/g, " ")}:</b>
      {{ value } ? value : null}
    </ListGroup.Item>
  );

  if (!record) {
    return ImageCardTemplate({
      title: "Запись не выбрана",
      className: "card-height",
    });
  }

  const { findings } = record;

  const renderFields = (fields, level = 0) => {
    if (typeof fields === "string") {
      if (fields.startsWith("data:image/")) {
        return ImageCardTemplate({
          src: fields,
          className: "image-card",
        });
      } else if (fields.trim() !== "") {
        return ListGroupTemplate({
          level: level,
          title: fields,
        });
      }
    }

    return Object.keys(fields).map((field) => {
      let value = fields[field];
      if (typeof value === "string" && value.trim() !== "") {
        if (value.startsWith("data:image/")) {
          return ImageCardTemplate({
            title: "",
            src: value,
            className: "image-card",
          });
        } else {
          return ListGroupTemplate({
            level: level,
            title: field,
            value: value,
          });
        }
      } else if (typeof value === "number") {
        return ListGroupTemplate({
          level: level,
          title: field,
          value: value,
        });
      } else if (Array.isArray(value) && value.length === 0) {
        return null;
      } else if (typeof value === "object" && value !== null) {
        const childFields = renderFields(value, level + 1);
        if (childFields.filter((child) => child !== null).length > 0) {
          return ListGroupTemplate({
            level: level,
            title: field,
            value: childFields,
          });
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
        <Card key={section} className="m-1">
          <Card.Header>{section.replace(/_/g, " ")}</Card.Header>
          <Card.Body>
            <ListGroup>{renderFields(fields)}</ListGroup>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <Card className="card-height">
      <Card.Header>
        <Card.Title>{record.findings_schema_name}</Card.Title>
      </Card.Header>
      <Card.Body className="card-content">{renderFindings(findings)}</Card.Body>
    </Card>
  );
};

export default PatientRecord;
