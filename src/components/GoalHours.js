import React, { useState } from "react";
import moment from "moment";
import {
  Table,
  FormControl,
  Card,
  CardGroup,
  ListGroup,
  Form
} from "react-bootstrap";
import { FaFrown, FaSmileBeam } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
export default HoursGoal;

const hours = {
  sunday: { start: "0:00", end: "0:00", breakDuration: 0 },
  monday: { start: "0:00", end: "0:00", breakDuration: 0 },
  tuesday: { start: "0:00", end: "0:00", breakDuration: 0 },
  wednesday: { start: "0:00", end: "0:00", breakDuration: 0 },
  thursday: { start: "0:00", end: "0:00", breakDuration: 0 },
  friday: { start: "0:00", end: "0:00", breakDuration: 0 },
  saturday: { start: "0:00", end: "0:00", breakDuration: 0 }
};

const initialConfig = {
  sunday: { enabled: false },
  monday: { enabled: true },
  tuesday: { enabled: true },
  wednesday: { enabled: true },
  thursday: { enabled: true },
  friday: { enabled: true },
  saturday: { enabled: false }
};

function TimeSelect({ type, time, day, handleSelectChange }) {
  const hoursOptions = getHoursOptions();

  return (
    <Form.Control
      id={`time-${day}-${type}`}
      as="select"
      value={time}
      onChange={e => handleSelectChange(day, type, e.target.value)}
    >
      {hoursOptions.map((timeOption, i) => (
        <option key={i}>{timeOption}</option>
      ))}
    </Form.Control>
  );
}

function BreakSelect({ breakDuration, day, handleSelectChange }) {
  const options = [
    { display: "0m", val: 0 },
    { display: "15m", val: 15 },
    { display: "30m", val: 30 },
    { display: "45m", val: 45 },
    { display: "1h", val: 60 },
    { display: "1h15m", val: 75 },
    { display: "1h30m", val: 90 }
  ];
  return (
    <FormControl
      as="select"
      id={`break-${day}`}
      onChange={e => handleSelectChange(day, "breakDuration", e.target.value)}
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

function getHoursOptions() {
  const desiredStartTime = "00:00";
  const interval = 15;
  const period = "m";
  const periodsInADay = moment.duration(1, "day").as(period);

  const options = [];
  const startTimeMoment = moment(desiredStartTime, "H:mm");
  for (let i = 0; i <= periodsInADay; i += interval) {
    startTimeMoment.add(i === 0 ? 0 : interval, period);
    options.push(startTimeMoment.format("H:mm"));
  }

  return options;
}

function calculateMinsWorkedForDay(startTime, endTime, breakDuration) {
  const start = moment(startTime, "H:mm");
  const end = moment(endTime, "H:mm");
  const startToEndInMinutes = end.diff(start, "minutes");
  const minutesWorked = startToEndInMinutes - breakDuration;
  return minutesWorked;
}

function formatMinutesWorked(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${h ? h + "h" : ""} ${m ? m + "m" : ""}`;
}

function getTotalMinsWorkedForWeek(data, config) {
  return Object.keys(data).reduce((acc, curr) => {
    return config[curr].enabled
      ? acc +
          calculateMinsWorkedForDay(
            data[curr].start,
            data[curr].end,
            data[curr].breakDuration
          )
      : acc;
  }, 0);
}

function getTotal(data, config) {
  const totalMinutesWorkedForWeek = getTotalMinsWorkedForWeek(data, config);
  return totalMinutesWorkedForWeek
    ? formatMinutesWorked(totalMinutesWorkedForWeek)
    : "0h";
}

function getDayTotal(start, end, breakDuration) {
  return formatMinutesWorked(
    calculateMinsWorkedForDay(start, end, breakDuration)
  );
}

function calcNumOfDaysWorked(data, config) {
  return Object.keys(data).reduce((acc, curr) => {
    const dayIsValid =
      config[curr].enabled &&
      calculateMinsWorkedForDay(
        data[curr].start,
        data[curr].end,
        data[curr].breakDuration
      );
    return dayIsValid ? ++acc : acc;
  }, 0);
}

function calcGoalMinsForTimeWorked(
  goalInHours,
  numOfDaysWorked,
  numOfDaysEnabled
) {
  const goalInMins = goalInHours * 60;
  const goalMinsForTimeWorked =
    (goalInMins / numOfDaysEnabled) * numOfDaysWorked;

  return goalMinsForTimeWorked;
}

function calcNumOfDaysEnabled(data, config) {
  return Object.keys(data).reduce(
    (acc, curr) => (config[curr].enabled ? ++acc : acc),
    0
  );
}

function getOffshoot(goal, data, config) {
  const numOfDaysWorked = calcNumOfDaysWorked(data, config);
  const numOfDaysEnabled = calcNumOfDaysEnabled(data, config);
  const goalMinsForTimeWorked = calcGoalMinsForTimeWorked(
    goal,
    numOfDaysWorked,
    numOfDaysEnabled
  );
  const totalMinutesWorkedForWeek = getTotalMinsWorkedForWeek(data, config);
  const offshoot = totalMinutesWorkedForWeek - goalMinsForTimeWorked;

  return offshoot;
}

function HoursGoal() {
  const [goal, setGoal] = useState(40);
  const [data, setData] = useState(hours);
  const [config, setConfig] = useState(initialConfig);

  const offshoot = getOffshoot(goal, data, config);

  const handleSwitchToggle = day => {
    let update = JSON.parse(JSON.stringify(config));
    update[day] = { ...update[day], enabled: !update[day].enabled };
    setConfig(update);
  };

  const handleSelectChange = (day, field, value) => {
    let update = JSON.parse(JSON.stringify(data));
    update[day] = { ...update[day], [field]: value };
    setData(update);
  };

  const chartXAxisLabels = ["S", "M", "T", "W", "T", "F", "S"];

  const labels = Object.keys(data)
    .map((day, i) => (config[day].enabled ? chartXAxisLabels[i] : null))
    .filter(label => label);

  const dayTotals = Object.keys(data).reduce((acc, curr) => {
    acc[curr] = getDayTotal(
      data[curr].start,
      data[curr].end,
      data[curr].breakDuration
    );
    return acc;
  }, {});

  const barData = Object.keys(data)
    .map(day => {
      return config[day].enabled
        ? calculateMinsWorkedForDay(
            data[day].start,
            data[day].end,
            data[day].breakDuration
          ) / 60
        : null;
    })
    .filter(val => val !== null)
    .reduce((acc, curr, idx) => {
      const update = acc;
      if (idx) {
        update.push(acc[idx - 1] + curr);
      } else {
        update.push(curr);
      }
      return update;
    }, []);

  const totalEnabledDays = Object.keys(config).reduce(
    (acc, curr) => (config[curr].enabled ? ++acc : acc),
    0
  );

  const lineData = barData.map((_, i) => (goal / totalEnabledDays) * (i + 1));

  const chartData = {
    labels: labels,
    datasets: [
      {
        barPercentage: 0.2,
        data: barData,
        label: "Accumulated hours"
      },
      {
        fill: false,
        data: lineData,
        pointBackgroundColor: "blue",
        pointBorderColor: "transparent",
        borderWidth: 2,
        borderColor: "blue",
        label: "Goal hours",
        type: "line"
      }
    ]
  };

  const barOptions = {
    layout: {
      padding: {
        top: 5
      }
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
            drawTicks: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            display: false
          },
          gridLines: {
            drawTicks: false,
            drawBorder: false,
            drawOnChartArea: false
          }
        }
      ]
    }
  };

  return (
    <>
      <CardGroup className="mt-5">
        <Card>
          <Card.Body className="text-center">
            <Bar data={chartData} options={barOptions} />
          </Card.Body>
        </Card>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>
                {offshoot === 0 && (
                  <FaSmileBeam
                    color="orange"
                    size="1.5em"
                    style={{ display: "inline" }}
                  />
                )}
                {(offshoot > 0 || offshoot < 0) && (
                  <FaFrown
                    color="red"
                    size="1.5em"
                    style={{ display: "inline" }}
                  />
                )}
                &nbsp;
                {formatMinutesWorked(Math.abs(offshoot))}
                &nbsp;
                {offshoot === 0 && "On Track!"}
                {offshoot > 0 && "Over-Worked"}
                {offshoot < 0 && "Under-Worked"}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>{getTotal(data, config)} Worked</h4>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </CardGroup>
      <br />
      <label htmlFor="goal-hours">Goal</label>
      <br />
      <FormControl
        id="goal"
        aria-describedby="goal"
        style={{ display: "inline", width: "200px" }}
        value={goal || ""}
        onChange={e => setGoal(e.target.value)}
      />
      <span className="ml-2" style={{ display: "inline" }}>
        hrs
      </span>
      <br />
      <br />
      <label>Hours worked</label>
      <Table bordered>
        <thead>
          <tr>
            <th>Day</th>
            <th>Start</th>
            <th>End</th>
            <th>Break</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key, i) => {
            return (
              <tr key={i}>
                <td>
                  <Form.Check
                    type="switch"
                    id={`switch-${key}`}
                    label={key}
                    checked={config[key].enabled}
                    onChange={() => handleSwitchToggle(key)}
                  />
                </td>
                <td>
                  <TimeSelect
                    type="start"
                    time={data[key].start}
                    day={key}
                    handleSelectChange={handleSelectChange}
                  />
                </td>
                <td>
                  <TimeSelect
                    type="end"
                    time={data[key].end}
                    day={key}
                    handleSelectChange={handleSelectChange}
                  />
                </td>
                <td>
                  <BreakSelect
                    breakDuration={data[key].breakDuration}
                    day={key}
                    handleSelectChange={handleSelectChange}
                  />
                </td>
                <td>{dayTotals[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <br />
      <Form.Control
        className="mb-3"
        as="textarea"
        rows="7"
        value={JSON.stringify(data)}
        onChange={e => setData(JSON.parse(e.target.value))}
      />
    </>
  );
}
