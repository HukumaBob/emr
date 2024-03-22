import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { TranslatableString } from "@rjsf/utils";

export default function ErrorList({ errors, registry }) {
  const { translateString } = registry;
  return (
    <Card border="danger" className="mb-4">
      <Card.Header className="alert-danger">
        {translateString(TranslatableString.ErrorsLabel)}
      </Card.Header>
      <Card.Body className="p-0">
        <ListGroup>
          {errors.map((error, i) => {
            return (
              <ListGroup.Item key={i} className="border-0">
                <span>{error.stack}</span>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
