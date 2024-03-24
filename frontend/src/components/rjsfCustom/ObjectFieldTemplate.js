import { useEffect, useState } from "react";
import { Accordion, Card, Container, Row, Col, Button } from "react-bootstrap";

const COLUMNS = 3;
const COLUMNS_WIDTH = 12 / COLUMNS;

export default function ObjectFieldTemplate(props) {
  const [openAll, setOpenAll] = useState(true);
  useEffect(() => {
    if (openAll) {
      // Здесь нужно добавить все ключи в activeKeys
      const allKeys = props.properties.map((_, index) => String(index));
      setActiveKeys(allKeys);
    } else {
      // Если openAll равно false, очистите activeKeys
      setActiveKeys([]);
    }
  }, [openAll, props.properties]);

  const [activeKeys, setActiveKeys] = useState([]); // начальное состояние: пустой массив

  const handleToggle = (index) => {
    setActiveKeys((prevKeys) =>
      prevKeys.includes(String(index))
        ? prevKeys.filter((key) => key !== String(index))
        : [...prevKeys, String(index)]
    );
  };

  // Группировка элементов по 3
  const groupedProperties = props.properties.reduce((grouped, item, index) => {
    const groupIndex = Math.floor(index / COLUMNS);
    if (!grouped[groupIndex]) {
      grouped[groupIndex] = [];
    }
    grouped[groupIndex].push(item);
    return grouped;
  }, []);

  return (
    <Container>
      <Accordion activeKey={activeKeys}>
        {groupedProperties.map((group, groupIndex) => (
          <Row className="justify-content-md-center" key={groupIndex}>
            {group.map((element, index) => {
              const actualIndex = groupIndex * COLUMNS + index;
              const onClickIndex = index;
              return (
                <Col xs lg={COLUMNS_WIDTH} key={actualIndex}>
                  <Card className="p-1 m-0 border rounded">
                    <Accordion.Item eventKey={String(actualIndex)}>
                      <Accordion.Header
                        onClick={() => handleToggle(actualIndex)}
                      >
                        {activeKeys.includes(String(actualIndex))
                          ? "Свернуть"
                          : `${element.content.props.schema.title}`}
                      </Accordion.Header>
                      <Accordion.Body>{element.content}</Accordion.Body>
                    </Accordion.Item>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ))}
      </Accordion>
      <Accordion activeKey="true">
        <Accordion.Item eventKey={String(openAll)}>
          <Accordion.Header
            onClick={() => {
              setOpenAll(!openAll);
            }}
          >
            {openAll ? "Collapse all" : "Open all cards and submit"}
          </Accordion.Header>
          <Accordion.Body>
            <Button type="submit" className="my-button m-1">
              Submit
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
