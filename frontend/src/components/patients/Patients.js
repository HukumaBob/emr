import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { BASE_URL, PATIENTS } from "../../api/apiConfig";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch(`${BASE_URL}${PATIENTS}`)
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Patient`s name</th>
          <th>DoB</th>
          <th>Gender</th>
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
