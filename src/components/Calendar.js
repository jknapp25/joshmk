import React from "react";
import moment from "moment";
import { Table } from "react-bootstrap";
export default Calendar;

const calTdStyles = { height: "80px" };

const CalendarCell = ({ dayNum, val, isCurrentDay }) => (
  <td
    align="middle"
    className={`p-1 ${isCurrentDay ? "bg-secondary" : ""}`}
    style={{ width: "auto", height: 0 }}
  >
    {dayNum ? <span className="float-left text-muted">{dayNum}</span> : null}
    <span className="text-success">{val ? `+${val}` : ""}</span>
  </td>
);

// const weeks = [
//   [null, 1, 2, 3, 4, 5, 6],
//   [7, 8, 9, 10, 11, 12, 13],
//   [14, 15, 16, 17, 18, 19, 20],
//   [21, 22, 23, 24, 25, 26, 27],
//   [28, 1, 2, 3, 4, 5, 6],
// ];

function getDates(startDate, stopDate) {
  let dateArray = [];
  let currentDate = moment(startDate);
  stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
}

function Calendar({
  month = false,
  days = true,
  showDayNum = true,
  mini = false,
  workouts = [],
}) {
  const currentDayOfWeek = moment();
  const startOfCurrentWeek = moment(currentDayOfWeek).startOf("week");
  const endOfCurrentWeek = moment(currentDayOfWeek).endOf("week");
  const currentWeekBattleDays = getDates(startOfCurrentWeek, endOfCurrentWeek);

  return (
    <Table bordered variant="dark">
      <thead className="border-bottom">
        <tr align="center">
          {month ? (
            <th className="font-weight-bold" colSpan="7">
              February
            </th>
          ) : null}
        </tr>
        {days ? (
          <tr align="center">
            {["S", "M", "T", "W", "TH", "F", "SA"].map((day) => (
              <th key={day} className="p-0 text-muted">
                {day}
              </th>
            ))}
          </tr>
        ) : null}
      </thead>
      <tbody>
        {mini ? (
          <tr className="border-bottom">
            {currentWeekBattleDays.map((day, i) => {
              const workoutsDuringDay = workouts.filter((wo) =>
                moment(wo.createdAt).isBetween(
                  moment(day).startOf("day"),
                  moment(day).endOf("day")
                )
              );

              // console.log(
              //   day,
              //   moment(day).startOf("day"),
              //   moment(day).endOf("day")
              // );

              const totalHits = workoutsDuringDay.reduce((acc, curr) => {
                if (!!curr.plannedStart) return acc;
                if (curr.joint) {
                  return acc + 2;
                } else {
                  return acc + 1;
                }
              }, 0);

              const cellVal = workoutsDuringDay.length > 0 ? totalHits : null;

              return (
                <CalendarCell
                  key={i}
                  dayNum={showDayNum ? moment(day).date() : null}
                  val={cellVal}
                  isCurrentDay={moment(day).isSame(currentDayOfWeek, "day")}
                />
              );
            })}
          </tr>
        ) : (
          <>
            <tr className="border-bottom" style={calTdStyles}>
              {[null, 1, 2, 3, 4, 5, 6].map((dayNum) => (
                <CalendarCell dayNum={dayNum} />
              ))}
            </tr>
            <tr className="border-bottom" style={calTdStyles}>
              {[7, 8, 9, 10, 11, 12, 13].map((dayNum) => (
                <CalendarCell dayNum={dayNum} />
              ))}
            </tr>
            <tr className="border-bottom" style={calTdStyles}>
              {[14, 15, 16, 17, 18, 19, 20].map((dayNum) => (
                <CalendarCell dayNum={dayNum} />
              ))}
            </tr>
            <tr className="border-bottom" style={calTdStyles}>
              {[21, 22, 23, 24, 25, 26, 27].map((dayNum) => (
                <CalendarCell dayNum={dayNum} />
              ))}
            </tr>
            <tr className="border-bottom" style={calTdStyles}>
              {[28, null, null, null, null, null, null].map((dayNum) => (
                <CalendarCell dayNum={dayNum} />
              ))}
            </tr>
          </>
        )}
      </tbody>
    </Table>
  );
}
