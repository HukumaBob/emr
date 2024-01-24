import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useReducer, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatient,
  updatePatient,
  closeForm,
} from "../../slices/patientFormSlice";
import { fetchPatients } from "../../slices/patientsSlice";

const initialPatientState = {
  first_name: "",
  middle_name: "",
  last_name: "",
  date_of_birth: "",
  sex: "",
  address: "",
  phone_number: "",
  email: "",
  // photo: null,
};

function patientReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "reset":
      return initialPatientState;
    case "load": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}

const PatientForm = () => {
  const [patient, dispatch] = useReducer(patientReducer, initialPatientState);
  const fileInput = useRef();
  const dispatchRedux = useDispatch();
  const patientFormStatus = useSelector((state) => state.patientForm.status);
  const loadedPatient = useSelector((state) => state.patientForm.patient);

  useEffect(() => {
    if (loadedPatient) {
      // Заполняем форму данными пациента, если они загружены
      dispatch({ type: "load", payload: loadedPatient });
    }
  }, [loadedPatient]);

  const handleFileChange = (e) => {
    dispatch({ type: "field", fieldName: "photo", payload: e.target.files[0] });
  };

  const handleChange = (e) => {
    dispatch({
      type: "field",
      fieldName: e.target.name,
      payload: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patientFormStatus === "idle") {
      if (patient.id) {
        // Обновляем существующего пациента
        dispatchRedux(updatePatient({ ...patient, fileInput }))
          .then(handleSuccess)
          .catch(handleError);
      } else {
        dispatchRedux(createPatient(patient))
          .then(() => {
            dispatchRedux(closeForm()); // Закрываем модальное окно после успешного выполнения
            dispatchRedux(fetchPatients()); // Запрашиваем данные о пациентах снова
            dispatch({ type: "reset" }); // Сбрасываем состояние формы
          })
          .catch((error) => {
            console.error("Ошибка при создании пациента:", error);
          });
      }
    }
  };
  const handleSuccess = () => {
    dispatchRedux(closeForm()); // Закрываем модальное окно после успешного выполнения
    dispatchRedux(fetchPatients()); // Запрашиваем данные о пациентах снова
    dispatch({ type: "reset" }); // Сбрасываем состояние формы
  };

  const handleError = (error) => {
    console.error("Ошибка при обновлении/создании пациента:", error);
  };

  return (
    <Card bg="dark" data-bs-theme="dark">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Photo
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="file"
                ref={fileInput}
                onChange={handleFileChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              First name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="first_name"
                value={patient.first_name}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Mid name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="middle_name"
                value={patient.middle_name}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Last name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="last_name"
                value={patient.last_name}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              DoB
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={patient.date_of_birth}
                onChange={handleChange}
              />
            </Col>
            <Form.Label column sm={2}>
              Sex
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                as="select"
                name="sex"
                value={patient.sex}
                onChange={handleChange}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Address
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="address"
                value={patient.address}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>
              Phone number
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="tel"
                name="phone_number"
                value={patient.phone_number}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>
              Email
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="email"
                name="email"
                value={patient.email}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PatientForm;
