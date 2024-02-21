import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useReducer, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeForm } from "../../slices/recordFormSlice";
import { createRecord } from "../../slices/recordForm/createRecord";
import { deleteRecord } from "../../slices/recordForm/deleteRecord";
import { deletePhotoRecord } from "../../slices/recordForm/deletePhotoRecord";
import { updateRecord } from "../../slices/recordForm/updateRecord";
import { fetchRecords } from "../../slices/recordsSlice";
import "./recordForm.css";
import {
  initialRecordState,
  recordReducer,
} from "../../slices/recordForm/recordReducer";

const PatientForm = () => {
  const [record, dispatch] = useReducer(patientReducer, initialPatientState);
  const fileInput = useRef();
  const dispatchRedux = useDispatch();
  const recordFormStatus = useSelector((state) => state.recordForm.status);
  const loadedRecord = useSelector((state) => state.recordForm.record);

  useEffect(() => {
    if (loadedRecord) {
      dispatch({ type: "load", payload: loadedRecord });
    }
  }, [loadedRecord, dispatch]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    dispatch({
      type: "field",
      fieldName: e.target.name,
      payload: e.target.files[0],
    });
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    dispatch({
      type: "field",
      fieldName: e.target.name,
      payload: e.target.value,
    });
  };

  const currentPage = useSelector((state) => state.patients.currentPage);

  const createPatientData = () => {
    dispatchRedux(createRecord(patient, dispatch))
      .then(() => {
        dispatchRedux(closeForm()); // Закрываем модальное окно после успешного выполнения
        dispatchRedux(fetchRecords(1, dispatch)); // Запрашиваем данные о пациентах снова
        dispatch({ type: "reset" }); // Сбрасываем состояние формы
      })
      .catch((error) => {
        console.error("Ошибка при создании пациента:", error);
      });
  };
  const updatePatientData = () => {
    dispatchRedux(
      updateRecord({ ...patient, fileInput, fieldName: "photo" }, dispatch)
    )
      .then(() => {
        dispatchRedux(closeForm()); // Закрываем модальное окно после успешного выполнения
        dispatchRedux(fetchRecords(currentPage, dispatch)); // Запрашиваем данные о пациентах снова
        dispatch({ type: "reset" }); // Сбрасываем состояние формы
      })
      .catch(handleError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patientFormStatus === "idle") {
      if (patient.id) {
        if (patient.photo && fileInput.current.files[0]) {
          dispatchRedux(deletePhotoRecord(patient.id))
            .then(() => {
              // После успешного удаления фото обновляем пациента
              updatePatientData();
            })
            .catch(handleError);
        } else {
          updatePatientData();
        }
      } else {
        createPatientData();
      }
    }
  };

  const deletePatientData = () => {
    dispatchRedux(deletePhotoRecord(patient.id, dispatch))
      .then(() => {
        dispatchRedux(deleteRecord(patient.id, dispatch))
          .then(() => {
            dispatchRedux(closeForm()); // Закрываем модальное окно после успешного выполнения
            dispatchRedux(fetchRecords(currentPage, dispatch)); // Запрашиваем данные о пациентах снова
            dispatch({ type: "reset" }); // Сбрасываем состояние формы
          })
          .catch((error) => {
            console.error("Ошибка при удалении пациента:", error);
          });
      })
      .catch((error) => {
        console.error("Ошибка при удалении фотографии пациента:", error);
      });
  };

  const handleDeletePatient = (e) => {
    e.preventDefault();
    if (patientFormStatus === "idle") {
      if (patient.id) {
        deletePatientData();
      }
    }
  };

  useEffect(() => {
    dispatchRedux(fetchRecords(currentPage, dispatch));
  }, [currentPage, dispatchRedux]);

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
            <Col sm={9}>
              <Form.Control
                type="file"
                name="photo"
                ref={fileInput}
                onChange={handleFileChange}
              />
            </Col>
            <Col sm={1} className="me-auto d-flex justify-content-center">
              {selectedImage ? (
                <Card.Img
                  src={selectedImage}
                  className="align-self-center my-thumbnail"
                />
              ) : loadedPatient?.photo ? (
                <Card.Img
                  src={loadedPatient.photo}
                  className="align-self-center my-thumbnail"
                />
              ) : (
                <></>
              )}
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
              Gender
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                as="select"
                name="gender"
                value={patient.gender}
                onChange={handleChange}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
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
          <Form.Group as={Row} className="mb-3 justify-content-md-center">
            <Col sm={6}>
              <Button variant="primary" type="submit" className="my-button">
                Submit
              </Button>
            </Col>
            <Col sm={6}>
              <Button
                variant="danger"
                type="button"
                onClick={handleDeletePatient}
                className="my-button"
              >
                Delete
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PatientForm;
