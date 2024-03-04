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
import { fetchRecords } from "../../slices/recordsSlice";
import { loadRecord } from "../../slices/recordForm/loadRecord";
import { closeSchemaForm } from "../../slices/schema/schemaReducer";
import { fetchSchemas } from "../../slices/schema/fetchSchemas";
import { loadSchema } from "../../slices/schema/loadSchema";
import ModalRecordForm from "../records/ModalRecordForm";
import "./Patients.css";

const PatientProfile = () => {
  const dispatch = useDispatch();
  const schemas = useSelector((state) => state.schema.schemas);
  const patient = useSelector((state) => state.patientForm.patient);
  const records = useSelector((state) => state.records.records);
  const showForm = useSelector((state) => state.schema.formOpen);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximizeRestore = () => {
    setIsMaximized(!isMaximized);
    console.log(isMaximized);
  };
  useEffect(() => {
    if (patient) {
      dispatch(fetchRecords({ page: 1, patient_id: patient.id }));
    }
  }, [patient, dispatch]);

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
                              setSelectedSchema(schema.name);
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
        <Modal
          fullscreen={isMaximized}
          size="lg"
          show={showForm}
          onHide={() => dispatch(closeSchemaForm())}
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
                <div className="me-3">{selectedSchema}</div>
                <Form.Select aria-label="Select ds">
                  <option>Выбери диагноз</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">
                    Threedsfdsfdsfsdfsdfdsdfsdfsdfsdfsdfsdfsdfsdfsdfsfsdf
                  </option>
                </Form.Select>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalRecordForm />
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default PatientProfile;
