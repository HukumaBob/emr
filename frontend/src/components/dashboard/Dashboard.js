import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LoremIpsum } from "react-lorem-ipsum";
const Dashboard = () => {
  return (
    <Card className="m-1">
      <Card.Img variant="top" src="../images/cat (3).jfif" />
      <Card.Body>
        <Card.Title>Patients</Card.Title>

        <LoremIpsum p={1} />

        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
