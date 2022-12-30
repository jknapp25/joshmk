import { FormControl } from "react-bootstrap";

import { getHoursOptions } from "../lib/goalHoursUtils";

export default TimeSelect;

function TimeSelect({ type, time, day, handleSelectChange }) {
  const hoursOptions = getHoursOptions();

  return (
    <FormControl
      id={`time-${day}-${type}`}
      as="select"
      value={time}
      onChange={(e) => handleSelectChange(day, type, e.target.value)}
    >
      {hoursOptions.map((timeOption, i) => (
        <option key={i}>{timeOption}</option>
      ))}
    </FormControl>
  );
}
