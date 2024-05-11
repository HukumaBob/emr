import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, setCurrentPage } from "../../slices/PatientsSlice.js";
import { openForm, closeForm } from "../../slices/patientFormSlice.js";
import { loadPatient } from "../../slices/patientForm/loadPatient.js";
import PatientForm from "./PatientForm.js";
import { PAGE_SIZE } from "../../api/apiConfig.js";
import { RiEdit2Line } from "react-icons/ri";
import "./Patients.css";
import PaginationComponent from "../pagination/PaginationComponent.js";

const PatientsList = () => {
  const currentPage = useSelector((state) => state.patients.currentPage);
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const totalPages = useSelector((state) => state.patients.totalPages);
  const showForm = useSelector((state) => state.patientForm.showForm);
  const [filters, setFilters] = useState({});
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    dispatch(fetchPatients({ page: currentPage, filters: filters }));
  }, [dispatch, currentPage, filters]);

  return (
    <Card className="card-height">
      <ListGroup variant="flush" className="card-content">
        <ListGroup.Item>
          <Form>
            <Form.Group as={Row} className="mb-1" controlId="nameFilter">
              <Col sm="6">
                <Form.Control
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  onChange={handleFilterChange}
                />
              </Col>
              <Col sm="6">
                <Form.Control
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  onChange={handleFilterChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1" controlId="dateFilter">
              <Col sm="12">
                <Form.Control
                  type="date"
                  name="date_of_birth"
                  onChange={handleFilterChange}
                />
              </Col>
            </Form.Group>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan="3">
                  <Button
                    className="my-button"
                    onClick={() => dispatch(openForm())}
                  >
                    Add patient
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id}>
                  <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                  <td
                    className={`patient-profile ${
                      patient.id === selectedPatientId ? "selected" : ""
                    }`}
                    onClick={() => {
                      dispatch(loadPatient(patient.id));
                      setSelectedPatientId(patient.id);
                    }}
                  >
                    {patient.first_name} {patient.middle_name}{" "}
                    {patient.last_name}, {patient.date_of_birth}
                  </td>
                  <td
                    className={`patient-profile ${
                      patient.id === selectedPatientId ? "selected" : ""
                    }`}
                    onClick={() => {
                      dispatch(loadPatient(patient.id));
                      dispatch(openForm());
                      setSelectedPatientId(patient.id);
                    }}
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
        <Modal show={showForm} onHide={() => dispatch(closeForm())}>
          <Modal.Header closeButton>
            <Modal.Title>Change patient profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PatientForm />
          </Modal.Body>
        </Modal>
      </ListGroup>
    </Card>
  );
};

export default PatientsList;
