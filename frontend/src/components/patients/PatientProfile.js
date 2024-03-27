import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { RiEdit2Line } from "react-icons/ri";
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
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [activeKey, setActiveKey] = useState("#allRecords");
  const [filters, setFilters] = useState({});
  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

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
          filters: filters,
          patient_id: patient.id,
        })
      );
    }
  }, [dispatch, patient, currentPage, filters]);

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
      <Card.Header>
        <Nav variant="tabs" activeKey={activeKey} onSelect={setActiveKey}>
          <Nav.Item>
            <Nav.Link href="#patientInformation">About patient</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#allRecords">Patient records</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#photo">Patient photo</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body className="card-content">
        {activeKey === "#photo" && (
          <>
            <Card.Img variant="top" src={patient.photo} />
          </>
        )}
        {activeKey === "#allRecords" && (
          <>
            <ListGroup.Item>
              <Form>
                <Form.Group as={Row} className="mb-1" controlId="nameFilter">
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      name="findings_schema__name"
                      placeholder="Record name"
                      onChange={handleFilterChange}
                    />
                  </Col>
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      name="specialist"
                      placeholder="Specialist"
                      onChange={handleFilterChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-1" controlId="nameFilter">
                  <Col sm="6">
                    <Form.Control
                      type="date"
                      name="date_of_record_after"
                      placeholder="Record name"
                      onChange={handleFilterChange}
                    />
                  </Col>
                  <Col sm="6">
                    <Form.Control
                      type="date"
                      name="date_of_record_before"
                      onChange={handleFilterChange}
                    />
                  </Col>
                </Form.Group>
              </Form>
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
                      onClick={() => {
                        dispatch(loadRecord(record.id));
                        setSelectedRecordId(record.id);
                      }}
                      className="patient-profile"
                    >
                      <td
                        className={`patient-profile ${
                          record.id === selectedRecordId ? "selected" : ""
                        }`}
                        colSpan="2"
                      >
                        {record.findings_schema_name}
                      </td>
                      <td colSpan="1">
                        {new Date(record.created_at).toLocaleDateString()}
                      </td>
                      <td
                      // className={`patient-profile ${
                      //   patient.id === selectedPatientId ? "selected" : ""
                      // }`}
                      // onClick={() => {
                      //   dispatch(loadPatient(patient.id));
                      //   dispatch(openForm());
                      //   setSelectedPatientId(patient.id);
                      // }}
                      >
                        <RiEdit2Line />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ListGroup.Item>
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
                  variant="light"
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
                    <Form.Select
                      aria-label="Select ds"
                      onChange={(event) => {
                        const selectedValue = event.target.value;
                        dispatch(loadTemplate(selectedValue));
                      }}
                    >
                      <option key="blankChoice" hidden value>
                        {selectedSchema?.name}
                      </option>
                      {selectedTemplates && selectedTemplates.results ? (
                        selectedTemplates.results.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.template_name}
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
                <ModalRecordForm
                  className="m-5"
                  currentTemplate={currentTemplate}
                />
              </Modal.Body>
            </Modal>
          </>
        )}
        {activeKey === "#patientInformation" && (
          <>
            <Card.Title className="text-muted">General information:</Card.Title>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Card.Text>
                  <span className="card-name">First name: </span>
                  {patient?.first_name}
                </Card.Text>
                <Card.Text>
                  <span className="card-name">Middle name: </span>
                  {patient?.middle_name}
                </Card.Text>
                <Card.Text>
                  <span className="card-name">Last name: </span>
                  {patient?.last_name}
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text>
                  <span className="card-name">Gender: </span>
                  {patient.gender}
                </Card.Text>
                <Card.Text>
                  <span className="card-name">Age: </span>
                  {calculateAge(patient.date_of_birth)}
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text>
                  <span className="card-name">Address: </span>
                  {patient?.address ? patient?.address : "unknown"}
                </Card.Text>
                <Card.Text>
                  <span className="card-name">Phone: </span>
                  {patient?.phone_number ? patient?.phone_number : "unknown"}
                </Card.Text>
                <Card.Text>
                  <span className="card-name">Email: </span>
                  {patient?.email ? patient?.email : "unknown"}
                </Card.Text>
              </ListGroup.Item>
            </ListGroup>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default PatientProfile;
