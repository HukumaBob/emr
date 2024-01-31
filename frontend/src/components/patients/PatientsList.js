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
import { fetchPatients, setCurrentPage } from "../../slices/patientsSlice.js";
import { openForm, closeForm } from "../../slices/patientFormSlice.js";
import { loadPatient } from "../../slices/patientForm/loadPatient.js";
import PatientForm from "./PatientForm.js";
import Pagination from "react-bootstrap/Pagination";
import { PAGE_SIZE } from "../../api/apiConfig.js";
import calculateAge from "../../utils.js";
import { RiEdit2Line } from "react-icons/ri";
import "./Patients.css";

const PatientsList = () => {
  const currentPage = useSelector((state) => state.patients.currentPage);
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const totalPages = useSelector((state) => state.patients.totalPages);
  const showForm = useSelector((state) => state.patientForm.showForm);
  const [filters, setFilters] = useState({});

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
    <Card className="m-1">
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Form>
            <Form.Group
              as={Row}
              className="mb-1"
              controlId="formPlaintextEmail"
            >
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
            {/* <input
              type="text"
              name="last_name"
              placeholder="Last name"
              // onChange={handleFilterChange}
            />
            <input
              type="date"
              name="date_of_birth"
              // onChange={handleFilterChange}
            /> */}
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan="3">
                  <Button
                    className="my-button"
                    onClick={() => dispatch(openForm())}
                  >
                    Add new
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id}>
                  <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                  <td
                    className="patient-profile"
                    onClick={() => {
                      dispatch(loadPatient(patient.id));
                    }}
                  >
                    {patient.first_name} {patient.middle_name}{" "}
                    {patient.last_name} ({patient.sex}),{" "}
                    {calculateAge(patient.date_of_birth)}
                  </td>
                  <td
                    className="patient-profile"
                    onClick={() => {
                      dispatch(loadPatient(patient.id));
                      dispatch(openForm());
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
          <Pagination className="justify-content-center pb-3">
            <Pagination.First onClick={() => dispatch(setCurrentPage(1))} />
            <Pagination.Prev
              onClick={() =>
                dispatch(setCurrentPage(currentPage > 1 ? currentPage - 1 : 1))
              }
            />
            <Pagination.Item onClick={() => dispatch(setCurrentPage(1))}>
              {1}
            </Pagination.Item>
            <Pagination.Ellipsis />

            {/* Показываем номера страниц вокруг текущей страницы */}
            {currentPage > 2 && (
              <Pagination.Item
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
              >
                {currentPage - 1}
              </Pagination.Item>
            )}
            {currentPage > 1 && currentPage < totalPages && (
              <Pagination.Item active>{currentPage}</Pagination.Item>
            )}
            {currentPage < totalPages - 1 && (
              <Pagination.Item
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
              >
                {currentPage + 1}
              </Pagination.Item>
            )}

            <Pagination.Ellipsis />
            <Pagination.Item
              onClick={() => dispatch(setCurrentPage(totalPages))}
            >
              {totalPages}
            </Pagination.Item>
            <Pagination.Next
              onClick={() =>
                dispatch(
                  setCurrentPage(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                )
              }
            />
            <Pagination.Last
              onClick={() => dispatch(setCurrentPage(totalPages))}
            />
          </Pagination>
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
