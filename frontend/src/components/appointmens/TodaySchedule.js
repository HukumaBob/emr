import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LoremIpsum } from "react-lorem-ipsum";
import Calendar from "./Calendar";

const TodaySchedule = () => {
  return (
    <div>
      <Card className="m-1">
        {/* <Card.Img variant="top" src="../images/cat (1).jfif" /> */}
        <Card.Body>
          <Card.Title>Today Schedule</Card.Title>
          <Card.Text>
            <Calendar />
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TodaySchedule;
