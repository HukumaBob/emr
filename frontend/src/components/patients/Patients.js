// Patients.js
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../slices/patientsSlice";
import {
  openForm,
  closeForm,
  loadPatient,
} from "../../slices/patientFormSlice.js";
import PatientForm from "./PatientForm.js";

const Patients = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);
  const showForm = useSelector((state) => state.patientForm.showForm); // Используйте состояние из Redux

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <>
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
            <tr key={patient.id}>
              <td>{index + 1}</td>
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

      <Modal show={showForm} onHide={() => dispatch(closeForm())}>
        <Modal.Header closeButton>
          <Modal.Title>New patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PatientForm />
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
};

export default Patients;
