import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { LoremIpsum } from "react-lorem-ipsum";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import calculateAge from "../../utils";
import { fetchRecords } from "../../slices/recordsSlice";

const PatientProfile = () => {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patientForm.patient);
  const records = useSelector((state) => state.records.records);
  useEffect(() => {
    if (patient) {
      dispatch(fetchRecords({ page: 1, patient_id: patient.id })); // Получите записи при загрузке компонента
    }
  }, [patient, dispatch]);

  if (!patient) {
    return <div>Пациент не выбран</div>;
  }

  return (
    <Card className="m-1">
      <Card.Img variant="top" src={patient.photo} />
      <Card.Body>
        <Card.Title>Patient profile</Card.Title>
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
            <Card.Subtitle className="m-1 text-muted">
              Nedical information:
            </Card.Subtitle>
            {records.map((record) => (
              <Card.Text key={record.id}>
                {record.record_type.header} -{" "}
                {new Date(record.created_at).toLocaleDateString()}
              </Card.Text>
            ))}
          </ListGroup.Item>
        </ListGroup>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default PatientProfile;
