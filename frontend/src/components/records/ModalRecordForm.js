import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/bootstrap-4";
import { createRecord } from "../../slices/recordForm/createRecord";

const ModalRecordForm = ({ currentTemplate }) => {
  const [inputValue, setInputValue] = useState(currentTemplate?.findings);
  const [formData] = useDebounce(inputValue, 500); // Дебаунсинг на 500 мс
  const dispatch = useDispatch();
  const patientId = useSelector((state) => state.patientForm.patient.id); // Получите id пациента из хранилища
  const specialistId = useSelector((state) => state.auth.username); // Получите id специалиста из хранилища
  const currentSchemaId = useSelector(
    (state) => state.schema.currentSchema?.id
  ); // Получите id схемы находок из хранилища

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

  function ObjectFieldTemplate(props) {
    const [isExpanded, setIsExpanded] = useState(() => ({
      ...Array(props.properties.length).fill(true),
    }));

    const handleToggle = (index) => {
      setIsExpanded((prevState) => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    };

    return (
      <div className="container-fluid">
        {props.description}
        <div className="row gx-0">
          {props.properties.map((element, index) => {
            return (
              <div
                key={index}
                className="p-1 m-0 col-12 col-md-3 border rounded"
              >
                <div className="d-flex">
                  <Button
                    className="btn btn-secondary w-100"
                    onClick={() => handleToggle(index)}
                  >
                    {isExpanded[index]
                      ? "Свернуть"
                      : `${element.content.props.schema.title}`}
                  </Button>
                </div>
                {isExpanded[index] && element.content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function CustomSelectWidget(props) {
    const { id, required, onChange, value, options, label } = props;
    return (
      <select
        className="form-select"
        aria-label={label}
        id={id}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value=""></option>
        {options.enumOptions.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  const widgets = {
    SelectWidget: CustomSelectWidget,
  };
  const uiSchema = {
    "ui:ObjectFieldTemplate": ObjectFieldTemplate,
  };
  const currentSchema = useSelector((state) => state.schema.currentSchema);
  const formOpen = useSelector((state) => state.schema.formOpen);
  const currentUiSchema =
    currentSchema && currentSchema.uiSchema ? currentSchema.uiSchema : {};
  const combinedUiSchema = {
    ...uiSchema,
    ...currentUiSchema,
  };

  if (!formOpen) {
    return null;
  }

  const onSubmit = ({ formData }) => {
    const payload = {
      patient_id: patientId,
      findings: formData,
      specialist_name: {
        user: specialistId,
      },
      findings_schema: currentSchemaId,
    };

    // Создайте новый объект FormData
    const formPayload = new FormData();

    // Для каждого свойства в payload, добавьте его в formPayload
    for (let key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Если свойство является объектом, преобразуйте его в строку JSON
        if (typeof payload[key] === "object" && payload[key] !== null) {
          formPayload.append(key, JSON.stringify(payload[key]));
        } else {
          formPayload.append(key, payload[key]);
        }
      }
    }

    dispatch(createRecord(formPayload));
  };
  return (
    <Card data-bs-theme="dark">
      <Card.Header>
        <Card.Title>{currentTemplate?.template_slug}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form
          schema={currentSchema.schema}
          onSubmit={onSubmit}
          formData={formData}
          onChange={(e) => setInputValue(e.formData)} // Обновляем inputValue вместо formData
          validator={validator}
          uiSchema={combinedUiSchema}
          widgets={widgets}
          ObjectFieldTemplate={ObjectFieldTemplate}
        ></Form>
      </Card.Body>
    </Card>
  );
};

export default ModalRecordForm;
