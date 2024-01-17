import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LoremIpsum } from "react-lorem-ipsum";

const TodaySchedule = () => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="../images/cat (1).jfif" />
        <Card.Body>
          <Card.Title>Today Schedule</Card.Title>
          <Card.Text>
            <LoremIpsum p={1} />
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TodaySchedule;
