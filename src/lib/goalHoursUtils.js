import moment from "moment";

export function calcMinsWorkedForDay(startTime, endTime, breakDuration) {
  const start = moment(startTime, "H:mm");
  const end = moment(endTime, "H:mm");
  const startToEndInMinutes = end.diff(start, "minutes");
  const minutesWorked = startToEndInMinutes - breakDuration;
  return minutesWorked;
}

export function calcNumOfDaysWorked(data, config) {
  return Object.keys(data).reduce((acc, curr) => {
    const dayIsValid =
      config[curr].enabled &&
      calcMinsWorkedForDay(
        data[curr].start,
        data[curr].end,
        data[curr].breakDuration
      );
    return dayIsValid ? ++acc : acc;
  }, 0);
}

export function calcGoalMinsForTimeWorked(
  goalInHours,
  numOfDaysWorked,
  numOfDaysEnabled
) {
  const goalInMins = goalInHours * 60;
  const goalMinsForTimeWorked =
    (goalInMins / numOfDaysEnabled) * numOfDaysWorked;

  return goalMinsForTimeWorked;
}

export function calcNumOfDaysEnabled(data, config) {
  return Object.keys(data).reduce(
    (acc, curr) => (config[curr].enabled ? ++acc : acc),
    0
  );
}

export function formatMinutesWorked(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${h ? h + "h" : ""} ${m ? m + "m" : ""}`;
}

export function getTotalMinsWorkedForWeek(data, config) {
  return Object.keys(data).reduce((acc, curr) => {
    return config[curr].enabled
      ? acc +
          calcMinsWorkedForDay(
            data[curr].start,
            data[curr].end,
            data[curr].breakDuration
          )
      : acc;
  }, 0);
}

export function getTotal(data, config) {
  const totalMinutesWorkedForWeek = getTotalMinsWorkedForWeek(data, config);
  return totalMinutesWorkedForWeek
    ? formatMinutesWorked(totalMinutesWorkedForWeek)
    : "0h";
}

export function getDayTotal(start, end, breakDuration) {
  return formatMinutesWorked(calcMinsWorkedForDay(start, end, breakDuration));
}

export function getOffshoot(goal, data, config) {
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

export function getHoursOptions() {
  const desiredStartTime = "00:00";
  const interval = 15;
  const period = "m";
  const options = [];
  const periodsInADay = moment.duration(1, "day").as(period);
  const startTimeMoment = moment(desiredStartTime, "H:mm");

  for (let i = 0; i <= periodsInADay; i += interval) {
    startTimeMoment.add(i === 0 ? 0 : interval, period);
    options.push(startTimeMoment.format("H:mm"));
  }

  return options;
}
