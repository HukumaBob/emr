import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import "./Patients.css";

const PatientRecord = () => {
  const record = useSelector((state) => state.recordForm.record);

  const CardTemplate = ({
    title = null,
    src = null,
    children = null,
    className = null,
    classNameBody = null,
  }) => (
    <Card className={className} key={uuid()}>
      {{ title } ? <Card.Header>{title}</Card.Header> : null}
      {{ src } ? <Card.Img variant="top" src={src}></Card.Img> : null}
      {{ children } ? (
        <Card.Body className={classNameBody}>{children}</Card.Body>
      ) : null}
    </Card>
  );

  const ListGroupTemplate = ({ level = 0, title = null, value = null }) => (
    <ListGroup.Item
      key={uuid()}
      variant="flush"
      style={{ marginLeft: `${level * 20}px`, flex: "1 1 auto" }}
    >
      <b>{title.replace(/_/g, " ")}: </b>
      <>{{ value } ? value : null}</>
    </ListGroup.Item>
  );

  if (!record) {
    return CardTemplate({
      title: "Запись не выбрана",
      className: "card-height",
    });
  }

  const { findings } = record;

  const renderFields = (fields, level = 0) => {
    if (typeof fields === "string") {
      if (fields.startsWith("data:image/")) {
        return CardTemplate({
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
          return CardTemplate({
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
        <Card key={section} className="card-content my-1">
          <Card.Header>{section.replace(/_/g, " ")}</Card.Header>
          <Card.Body>
            <ListGroup
              key={uuid()}
              horizontal="lg"
              className="d-flex flex-wrap justify-content-center"
            >
              {renderFields(fields)}
            </ListGroup>
          </Card.Body>
        </Card>
      );
    });
  };

  return CardTemplate({
    title: record.findings_schema_name,
    className: "card-height",
    classNameBody: "card-content",
    children: renderFindings(findings),
  });
};

export default PatientRecord;
