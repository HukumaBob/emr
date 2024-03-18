import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { RiFullscreenExitFill, RiFullscreenFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import calculateAge from "../../utils";
import { fetchRecords, setCurrentPage } from "../../slices/recordsSlice";
import { loadRecord } from "../../slices/recordForm/loadRecord";
import { closeSchemaForm } from "../../slices/schema/schemaReducer";
import { closeTemplateForm } from "../../slices/templates/templateReducer";
import { fetchSchemas } from "../../slices/schema/fetchSchemas";
import { loadSchema } from "../../slices/schema/loadSchema";
import ModalRecordForm from "../records/ModalRecordForm";
import { fetchTemplates } from "../../slices/templates/fetchTemplates";
import { loadTemplate } from "../../slices/templates/loadTemplate";
import "./Patients.css";
import PaginationComponent from "../pagination/PaginationComponent";

const PatientProfile = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.records.currentPage);
  const totalPages = useSelector((state) => state.records.totalPages);
  const schemas = useSelector((state) => state.schema.schemas);
  const patient = useSelector((state) => state.patientForm.patient);
  const records = useSelector((state) => state.records.records);
  const showForm = useSelector((state) => state.schema.formOpen);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState(null);
  const currentTemplate = useSelector(
    (state) => state.template.currentTemplate
  );

  useEffect(() => {
    if (selectedSchema) {
      dispatch(
        fetchTemplates({
          page: 1,
          page_size: 100,
          filters: { findings_schema: selectedSchema?.id },
        })
      )
        .unwrap()
        .then((template) => {
          setSelectedTemplates(template);
        })
        .catch((error) => console.error("Failed to load template:", error));
    }
  }, [selectedSchema, dispatch]);

  const handleMaximizeRestore = () => {
    setIsMaximized(!isMaximized);
  };
  useEffect(() => {
    if (patient) {
      dispatch(
        fetchRecords({
          page: currentPage,
          page_size: 100,
          patient_id: patient.id,
        })
      );
    }
  }, [dispatch, patient, currentPage]);

  useEffect(() => {
    dispatch(fetchSchemas({ page: 1 }));
  }, [dispatch]);

  if (!patient) {
    return (
      <Card className="card-height">
        <Card.Header>
          <Card.Title>Пациент не выбран</Card.Title>
        </Card.Header>
        <Card.Body className="card-content"></Card.Body>
      </Card>
    );
  }

  return (
    <Card className="card-height">
      <Card.Img variant="top" src={patient.photo} />
      <Card.Body className="card-content">
        <ListGroup variant="flush">
          <ListGroup.Item className="m-1">
            <Card.Subtitle className="text-muted">
              General information:
            </Card.Subtitle>
            <Card.Text className="m-1">
              <span className="card-name">name: </span>
              {patient.first_name} {patient.middle_name} {patient.last_name}
            </Card.Text>
            <Card.Text className="m-1">
              <span className="card-name">gender: </span>
              {patient.gender}
              {", "}
              <span className="card-name">age: </span>
              {calculateAge(patient.date_of_birth)}
            </Card.Text>
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Subtitle className="text-muted">
              Medical information:
            </Card.Subtitle>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan="3">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-basic"
                        // split
                        className="my-button"
                      >
                        Add record
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {schemas.map((schema) => (
                          <Dropdown.Item
                            key={schema.id}
                            onClick={() => {
                              dispatch(loadSchema(schema.id));
                              setSelectedSchema(schema);
                            }}
                          >
                            {schema.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr
                    key={record.id}
                    onClick={() => dispatch(loadRecord(record.id))}
                    className="patient-profile"
                  >
                    <td colSpan="2">{record.findings_schema_name}</td>
                    <td colSpan="1">
                      {new Date(record.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup.Item>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </ListGroup.Item>
        <Modal
          fullscreen={isMaximized}
          size="lg"
          show={showForm}
          onHide={() => {
            dispatch(closeSchemaForm());
            if (currentTemplate) {
              dispatch(closeTemplateForm());
            }
          }}
        >
          <Modal.Header className="position-relative" closeButton>
            {" "}
            <Button
              variant="secondary"
              className="position-absolute top-50 translate-middle ms-3"
              onClick={handleMaximizeRestore}
            >
              {isMaximized ? (
                <RiFullscreenExitFill size="2em" />
              ) : (
                <RiFullscreenFill size="2em" />
              )}
            </Button>
            <Modal.Title
              id="modal-title"
              className="position-absolute top-50 start-50 translate-middle w-75"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-2">{selectedSchema?.name}</div>
                <Form.Select
                  aria-label="Select ds"
                  onChange={(event) => {
                    const selectedValue = event.target.value;
                    dispatch(loadTemplate(selectedValue));
                  }}
                >
                  <option key="blankChoice" hidden value>
                    {" "}
                    --Select diagnosis--{" "}
                  </option>
                  {selectedTemplates && selectedTemplates.results ? (
                    selectedTemplates.results.map((option) => (
                      <option key={option.id} value={option.id}>
                        "{option.template_name}"
                      </option>
                    ))
                  ) : (
                    <option>--Diagnosis is unknown--</option>
                  )}
                </Form.Select>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalRecordForm currentTemplate={currentTemplate} />
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default PatientProfile;
