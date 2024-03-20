import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/bootstrap-4";
import { createRecord } from "../../slices/recordForm/createRecord";
import { closeSchemaForm } from "../../slices/schema/schemaReducer";
import { fetchRecords } from "../../slices/recordsSlice";

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
            <div key={index} className="p-1 m-0 col-12 col-md-3 border rounded">
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

const ModalRecordForm = ({ currentTemplate }) => {
  const [formData, setInputValue] = useState(currentTemplate?.findings);
  // const [formData] = useDebounce(inputValue, 5000);
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

  const createRecordData = (formPayload) => {
    dispatch(createRecord(formPayload));
    // .then(() => {
    // dispatch(closeForm()); // Закрываем модальное окно после успешного выполнения
    // dispatch(fetchRecords(1, dispatch));
    // dispatch({ type: "reset" }); // Сбрасываем состояние формы
    // })
    // .catch((error) => {
    //   console.error("Ошибка при создании записи:", error);
    // });
  };

  const onSubmit = ({ formData }) => {
    const payload = {
      patient_id: patientId,
      findings: formData,
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

    dispatch(createRecord(formPayload, dispatch)).then(() => {
      dispatch(closeSchemaForm());
      dispatch(
        fetchRecords({
          page: 1,
          patient_id: patientId,
        })
      ).catch((error) => {
        console.error("Ошибка при создании записи:", error);
      });
    });
  };
  const onCancel = () => {
    dispatch(closeSchemaForm());
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
          onCancel={onCancel}
          liveOmit={true}
          formData={formData}
          onChange={(e) => setInputValue(e.formData)}
          validator={validator}
          uiSchema={combinedUiSchema}
          widgets={widgets}
          ObjectFieldTemplate={ObjectFieldTemplate}
        >
          <Button type="submit">Submit</Button>
          <Button type="button">Cancel</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ModalRecordForm;
