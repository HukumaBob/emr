import { Container, Row, Col } from "react-bootstrap";

export default function ArrayFieldItemTemplate(props) {
  const {
    children,
    disabled,
    hasToolbar,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    index,
    onCopyIndexClick,
    onDropIndexClick,
    onReorderClick,
    readonly,
    registry,
    uiSchema,
  } = props;
  const { CopyButton, MoveDownButton, MoveUpButton, RemoveButton } =
    registry.templates.ButtonTemplates;
  const btnStyle = {
    flex: 1,
    paddingLeft: 6,
    marginRight: 6,
    marginLeft: 6,
    paddingRight: 6,
    fontWeight: "bold",
  };
  const hasCopy = true;
  return (
    <Container>
      <Row className="mb-0  d-flex align-items-center">
        <Col xs="12" lg="12">
          {children}
        </Col>
      </Row>
      <Row className="mb-0  d-flex align-items-center">
        <Col xs="12" lg="12" className="py-1">
          {hasToolbar && (
            <div className="d-flex flex-row ">
              {(hasMoveUp || hasMoveDown) && (
                <div className="m-0 p-0">
                  <MoveUpButton
                    className="array-item-move-up"
                    style={btnStyle}
                    disabled={disabled || readonly || !hasMoveUp}
                    onClick={onReorderClick(index, index - 1)}
                    uiSchema={uiSchema}
                    registry={registry}
                  />
                </div>
              )}
              {(hasMoveUp || hasMoveDown) && (
                <div className="m-0 p-0">
                  <MoveDownButton
                    style={btnStyle}
                    disabled={disabled || readonly || !hasMoveDown}
                    onClick={onReorderClick(index, index + 1)}
                    uiSchema={uiSchema}
                    registry={registry}
                  />
                </div>
              )}
              {hasCopy && (
                <div className="m-0 p-0">
                  <CopyButton
                    style={btnStyle}
                    disabled={disabled || readonly}
                    onClick={onCopyIndexClick(index)}
                    uiSchema={uiSchema}
                    registry={registry}
                  />
                </div>
              )}
              {hasRemove && (
                <div className="m-0 p-0">
                  <RemoveButton
                    style={btnStyle}
                    disabled={disabled || readonly}
                    onClick={onDropIndexClick(index)}
                    uiSchema={uiSchema}
                    registry={registry}
                  />
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
