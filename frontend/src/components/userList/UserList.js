import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { BASE_URL, USERS } from "../../api/apiConfig";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch(`${BASE_URL}${USERS}`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User name</th>
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
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>
              {user.first_name} {user.middle_name} {user.last_name}
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

export default Users;
