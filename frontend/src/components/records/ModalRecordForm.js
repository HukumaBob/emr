import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ModalRecordForm = () => {
  const schema = useSelector((state) => state.schema.currentSchema);
  const formOpen = useSelector((state) => state.schema.formOpen);

  const [formData, setFormData] = useState({});

  if (!formOpen) {
    return null;
  }

  const handleChange = (fullKey, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fullKey]: value,
    }));
  };

  const renderFormFields = (properties, parentKey = "") => {
    return Object.keys(properties).flatMap((key) => {
      const property = properties[key];
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (property.type === "object" && property.properties) {
        return renderFormFields(property.properties, fullKey);
      } else if (property.enum) {
        return (
          <Form.Select key={fullKey}>
            <option>{property.description}</option>
            {property.enum.map((option, index) => (
              <option key={index} onClick={() => handleChange(fullKey, option)}>
                {option}
              </option>
            ))}
          </Form.Select>
        );
      } else if (property.type === "boolean") {
        return (
          <Form.Check
            type="checkbox"
            label={property.description}
            key={fullKey}
            onChange={(e) => handleChange(fullKey, e.target.checked)}
          />
        );
      } else {
        return (
          <Form.Group className="mb-3" key={fullKey}>
            <Form.Label>{property.description}</Form.Label>
            <Form.Control
              type="text"
              name={fullKey}
              value={formData[fullKey] || ""}
              onChange={(e) => handleChange(fullKey, e.target.value)}
            />
          </Form.Group>
        );
      }
    });
  };

  return (
    <Card data-bs-theme="dark">
      <Card.Body>
        <Form>
          {renderFormFields(schema.schema.properties)}
          <Button variant="primary" type="submit">
            Отправить
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ModalRecordForm;
