import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch("http://localhost:8000/api/patients/")
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
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
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{patient.first_name}</td>
            <td>{patient.middle_name}</td>
            <td>{patient.last_name}</td>
            <td>{patient.date_of_birth}</td>
            <td>{patient.gender}</td>
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
