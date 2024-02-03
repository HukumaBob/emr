import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { LoremIpsum } from "react-lorem-ipsum";
import { useSelector } from "react-redux";
import calculateAge from "../../utils";

const PatientProfile = () => {
  const patient = useSelector((state) => state.patientForm.patient);

  if (!patient) {
    return <div>Пациент не выбран</div>;
  }

  return (
    <Card className="m-1">
      <Card.Img variant="top" src={patient.photo} />
      <Card.Body>
        <Card.Title>Patient profile</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Card.Subtitle className="mb-2 text-muted">
              General information:
            </Card.Subtitle>
            <p>First name: {patient.first_name}</p>
            <p>Middle name: {patient.middle_name}</p>
            <p>Last name: {patient.last_name}</p>
            <p>Gender: {patient.gender}</p>
            <p>
              Age: ({patient.date_of_birth})
              {calculateAge(patient.date_of_birth)}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Subtitle className="mb-2 text-muted">
              Nedical information:
            </Card.Subtitle>
            <LoremIpsum p={1} />
          </ListGroup.Item>
        </ListGroup>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default PatientProfile;
