import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/bootstrap-4";
import { createRecord } from "../../slices/recordForm/createRecord";
import { closeSchemaForm } from "../../slices/schema/schemaReducer";
import { fetchRecords } from "../../slices/recordsSlice";
import "./RecordForm.css";
import { closeTemplateForm } from "../../slices/templates/templateReducer";
import ObjectFieldTemplate from "../rjsfCustom/ObjectFieldTemplate";
import CustomSelectWidget from "../rjsfCustom/CustomSelectWidget";
import ArrayFieldTemplate from "../rjsfCustom/ArrayFieldTemplate";

const ModalRecordForm = ({ currentTemplate }) => {
  const [formData, setInputValue] = useState(currentTemplate?.findings);
  const [usedTemplates, setUsedTemplates] = useState([]);
  const dispatch = useDispatch();
  const patientId = useSelector((state) => state.patientForm.patient.id);
  const currentSchemaId = useSelector(
    (state) => state.schema.currentSchema?.id
  );
  useEffect(() => {
    setInputValue((prevFormData) => {
      // Создаем новый объект, объединяя текущие formData и currentTemplate?.findings
      // Если поля уже существуют в formData, они будут заменены значениями из currentTemplate?.findings
      // Если поля есть только в currentTemplate?.findings, они будут добавлены
      // Если поля есть только в formData, они будут сохранены
      const newFormData = { ...prevFormData, ...currentTemplate?.findings };
      return newFormData;
    });
  }, [currentTemplate?.findings]);

  useEffect(() => {
    if (currentTemplate?.template_name) {
      setUsedTemplates((prevTemplates) => {
        if (!prevTemplates.includes(currentTemplate.template_name)) {
          return [...prevTemplates, currentTemplate.template_name];
        } else {
          return prevTemplates;
        }
      });
    }
  }, [currentTemplate?.template_name]);

  const widgets = {
    SelectWidget: CustomSelectWidget,
  };
  const uiSchema = {
    "ui:ObjectFieldTemplate": ObjectFieldTemplate,
  };
  const currentSchema = useSelector((state) => state.schema.currentSchema);
  const formOpen = useSelector((state) => state.schema.formOpen);
  const currentUiSchema =
    currentSchema && currentSchema.ui_schema ? currentSchema.ui_schema : {};
  const combinedUiSchema = {
    ...uiSchema,
    ...currentUiSchema,
  };

  if (!formOpen) {
    return null;
  }

  const closeForm = () => {
    dispatch(closeSchemaForm());
    if (currentTemplate) {
      dispatch(closeTemplateForm());
    }
  };

  const onSubmit = ({ formData }) => {
    const payload = {
      patient_id: patientId,
      findings: formData,
      findings_schema: currentSchemaId,
    };

    const formPayload = new FormData();

    for (let key in payload) {
      if (payload.hasOwnProperty(key)) {
        if (typeof payload[key] === "object" && payload[key] !== null) {
          formPayload.append(key, JSON.stringify(payload[key]));
        } else {
          formPayload.append(key, payload[key]);
        }
      }
    }

    dispatch(createRecord(formPayload, dispatch)).then(() => {
      closeForm();
      dispatch(
        fetchRecords({
          page: 1,
          patient_id: patientId,
        })
      ).catch((error) => {
        console.error("Error when create a record:", error);
      });
    });
  };

  const onCancel = () => {
    closeForm();
  };

  return (
    <Card data-bs-theme="dark">
      <Card.Header>
        <Card.Title>Used templates: {usedTemplates.join(", ")}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form
          schema={currentSchema.schema}
          onSubmit={onSubmit}
          templates={{ ArrayFieldTemplate }}
          formData={formData}
          onChange={(e) => setInputValue(e.formData)}
          validator={validator}
          uiSchema={combinedUiSchema}
          widgets={widgets}
          liveValidate
        >
          <Container>
            <Row>
              <Col sm="12">
                <Button
                  onClick={onCancel}
                  type="button"
                  className="my-button m-1"
                  variant="secondary"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ModalRecordForm;
