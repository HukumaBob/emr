import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import { LoremIpsum } from "react-lorem-ipsum";
const Dashboard = () => {
  return (
    <Container style={{ justifyContent: "center", padding: "10px" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="../images/cat (3).jfif" />
        <Card.Body>
          <Card.Title>Patients</Card.Title>
          <Card.Text>
            <LoremIpsum p={1} />
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
