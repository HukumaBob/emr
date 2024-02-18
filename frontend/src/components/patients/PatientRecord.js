// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Table from "react-bootstrap/Table";
// import ListGroup from "react-bootstrap/esm/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadRecord } from "../../slices/recordForm/loadRecord";

const PatientRecord = () => {
  const dispatch = useDispatch();
  const record = useSelector((state) => state.recordForm.patient);
  const [lastRecordId, setLastRecordId] = useState(null);
  useEffect(() => {
    if (record && record.id !== lastRecordId) {
      dispatch(loadRecord(record.id));
      setLastRecordId(record.id);
    }
  }, [record, dispatch, lastRecordId]);

  if (!record) {
    return <div>Запись не выбрана</div>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{record.record_type.name.short_name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default PatientRecord;
