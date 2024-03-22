export default function CustomSelectWidget(props) {
  const { id, required, onChange, value, options, label } = props;
  return (
    <select
      className="form-select"
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
    </select>
  );
}
