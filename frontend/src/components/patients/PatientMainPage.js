import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PatientProfile from "./PatientProfile.js";
import PatientRecord from "./PatientRecord.js";
import PatientsList from "./PatientsList.js";

const PatientMainPage = () => {
  return (
    <Container fluid className="ps-1 pe-1 pt-0 pb-1 m-0">
      <Row className="gx-1">
        <Col xs lg="3">
          <PatientsList />
        </Col>
        <Col xs lg="3">
          <PatientProfile />
        </Col>
        <Col xs lg="6">
          <PatientRecord />
        </Col>
      </Row>
    </Container>
  );
};

export default PatientMainPage;
