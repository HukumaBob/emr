import Form from "react-bootstrap/Form";

export default function CustomSelectWidget(props) {
  const { id, required, onChange, value, options, label } = props;
  return (
    <Form.Select
      aria-label={label}
      id={id}
      required={required}
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      <option value=""></option>
      {options.enumOptions.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
}
