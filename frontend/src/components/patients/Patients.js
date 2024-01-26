import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, setCurrentPage } from "../../slices/patientsSlice";
import {
  openForm,
  closeForm,
  loadPatient,
} from "../../slices/patientFormSlice.js";
import PatientForm from "./PatientForm.js";
import Pagination from "react-bootstrap/Pagination";
import { PAGE_SIZE } from "../../api/apiConfig.js";
import Container from "react-bootstrap/esm/Container.js";

const Patients = () => {
  const currentPage = useSelector((state) => state.patients.currentPage);
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const totalPages = useSelector((state) => state.patients.totalPages);
  const showForm = useSelector((state) => state.patientForm.showForm);
  // const [active, setActive] = useState(1);

  useEffect(() => {
    dispatch(fetchPatients(currentPage));
  }, [dispatch, currentPage]);

  return (
    <Container
      fluid
      expand="lg"
      className="bg-body-tertiary"
      // style={{ overflow: "auto" }}
    >
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient`s name</th>
            <th>DoB</th>
            <th>Sex</th>
            <th>Phone Number</th>
            <th>
              <Button onClick={() => dispatch(openForm())}>Add new</Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr
              key={patient.id}
              onDoubleClick={() => {
                dispatch(loadPatient(patient.id));
                dispatch(openForm());
              }}
            >
              <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
              <td>
                {patient.first_name} {patient.middle_name} {patient.last_name}
              </td>
              <td>{patient.date_of_birth}</td>
              <td>{patient.sex}</td>
              <td>{patient.phone_number}</td>
              <td>
                <Button
                  onClick={() => {
                    dispatch(loadPatient(patient.id));
                    dispatch(openForm());
                  }}
                >
                  Change
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
        <Pagination.Item onClick={() => dispatch(setCurrentPage(totalPages))}>
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
        <Pagination.Last onClick={() => dispatch(setCurrentPage(totalPages))} />
      </Pagination>
      <Modal show={showForm} onHide={() => dispatch(closeForm())}>
        <Modal.Header closeButton>
          <Modal.Title>New patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PatientForm />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Patients;
