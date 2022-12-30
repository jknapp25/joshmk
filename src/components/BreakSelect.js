import { FormControl } from "react-bootstrap";

export default BreakSelect;

const options = [
  { display: "0m", val: 0 },
  { display: "15m", val: 15 },
  { display: "30m", val: 30 },
  { display: "45m", val: 45 },
  { display: "1h", val: 60 },
  { display: "1h15m", val: 75 },
  { display: "1h30m", val: 90 },
];

function BreakSelect({ breakDuration, day, handleSelectChange }) {
  return (
    <FormControl
      as="select"
      id={`break-${day}`}
      onChange={(e) => handleSelectChange(day, "breakDuration", e.target.value)}
      value={breakDuration}
    >
      {options.map(({ display, val }, i) => (
        <option value={val} key={i}>
          {display}
        </option>
      ))}
    </FormControl>
  );
}
