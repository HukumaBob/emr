import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../slices/PatientsSlice";

const Patients = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Patient`s name</th>
          <th>DoB</th>
          <th>Sex</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Updated At</th>
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
            <td>{patient.address}</td>
            <td>{patient.phone_number}</td>
            <td>{patient.email}</td>
            <td>{patient.created_at}</td>
            <td>{patient.updated_at}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Patients;
