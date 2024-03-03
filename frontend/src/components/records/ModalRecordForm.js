import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/bootstrap-4";
// import Form from "@rjsf/material-ui";

const ModalRecordForm = () => {
  function ArrayFieldTemplate(props) {
    return (
      <div>
        {props.items.map((element) => element.children)}
        {props.canAdd && (
          <button type="button" onClick={props.onAddClick}></button>
        )}
      </div>
    );
  }

  function ObjectFieldTemplate(props) {
    const [isExpanded, setIsExpanded] = useState({});

    const handleToggle = (index) => {
      setIsExpanded((prevState) => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    };

    return (
      <div className="container-fluid ">
        <figure class="text-center">
          <h1>{props.title}</h1>
        </figure>
        {props.description}
        <div className="row gx-0">
          {props.properties.map((element, index) => {
            return (
              <div key={index} className="p-1 col-12 col-md-3">
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
    "ui:ArrayFieldTemplate": ArrayFieldTemplate,
  };
  const currentSchema = useSelector((state) => state.schema.currentSchema);
  const formOpen = useSelector((state) => state.schema.formOpen);

  if (!formOpen) {
    return null;
  }

  const onSubmit = ({ formData }, e) =>
    console.log("Data submitted: ", formData);

  return (
    <Card data-bs-theme="dark">
      <Card.Body>
        <Form
          data-bs-theme="light"
          schema={currentSchema.schema}
          onSubmit={onSubmit}
          validator={validator}
          uiSchema={uiSchema}
          // formData={formData}
          widgets={widgets}
          ObjectFieldTemplate={ObjectFieldTemplate}
          ArrayFieldTemplate={ArrayFieldTemplate}
        ></Form>
      </Card.Body>
    </Card>
  );
};

export default ModalRecordForm;
