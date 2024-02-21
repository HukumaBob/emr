import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import calculateAge from "../../utils";
import { fetchRecords } from "../../slices/recordsSlice";
import { loadRecord } from "../../slices/recordForm/loadRecord";
import "./Patients.css";

const PatientProfile = () => {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patientForm.patient);
  const records = useSelector((state) => state.records.records);
  useEffect(() => {
    if (patient) {
      dispatch(fetchRecords({ page: 1, patient_id: patient.id }));
    }
  }, [patient, dispatch]);

  if (!patient) {
    return (
      <Card className="card-height">
        <Card.Header>
          <Card.Title>Пациент не выбран</Card.Title>
        </Card.Header>
        <Card.Body className="card-content"></Card.Body>
      </Card>
    );
  }

  return (
    <Card className="card-height">
      <Card.Img variant="top" src={patient.photo} />
      <Card.Body className="card-content">
        <ListGroup variant="flush">
          <ListGroup.Item className="m-1">
            <Card.Subtitle className="text-muted">
              General information:
            </Card.Subtitle>
            <Card.Text className="m-1">
              <span className="card-name">name: </span>
              {patient.first_name} {patient.middle_name} {patient.last_name}
            </Card.Text>
            <Card.Text className="m-1">
              <span className="card-name">gender: </span>
              {patient.gender}
              {", "}
              <span className="card-name">age: </span>
              {calculateAge(patient.date_of_birth)}
            </Card.Text>
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Subtitle className="text-muted">
              Medical information:
            </Card.Subtitle>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan="3">
                    {" "}
                    <Button
                      className="my-button"
                      // onClick={() => dispatch(openForm())}
                    >
                      Add new record
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr
                    key={record.id}
                    onClick={() => dispatch(loadRecord(record.id))}
                    className="patient-profile"
                  >
                    <td colSpan="2">{record.record_type_name.name}</td>
                    <td colSpan="1">
                      {new Date(record.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ListGroup.Item>
        </ListGroup>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default PatientProfile;
