import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPatient, closeForm } from "../../slices/patientFormSlice";
import { fetchPatients } from "../../slices/patientsSlice";

const PatientForm = () => {
  const [patient, setPatient] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    sex: "",
    address: "",
    phone_number: "",
    email: "",
  });
  const fileInput = useRef();
  const dispatch = useDispatch();
  const patientFormStatus = useSelector((state) => state.patientForm.status);
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => setShowForm(false);

  const handleFileChange = (e) => {
    setPatient({
      ...patient,
      photo: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patientFormStatus === "idle") {
      dispatch(createPatient(patient))
        .then(() => {
          dispatch(closeForm()); // Закрываем модальное окно после успешного выполнения
          dispatch(fetchPatients()); // Запрашиваем данные о пациентах снова
        })
        .catch((error) => {
          console.error("Ошибка при создании пациента:", error);
        });
    }
  };

  return (
    <Card bg="dark" data-bs-theme="dark">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="file"
              ref={fileInput}
              onChange={handleFileChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={patient.first_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              name="middle_name"
              value={patient.middle_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={patient.last_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="date_of_birth"
              value={patient.date_of_birth}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Sex</Form.Label>
            <Form.Control
              as="select"
              name="sex"
              value={patient.sex}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={patient.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone_number"
              value={patient.phone_number}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={patient.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PatientForm;
