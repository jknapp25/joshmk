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
    {dayNum ? <span className="text-muted float-left">{dayNum}</span> : null}
    {val}
  </td>
);

const weeks = [
  [null, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 1, 2, 3, 4, 5, 6],
];

function Calendar({
  month = false,
  days = true,
  showDayNum = true,
  mini = false,
  workouts = [],
}) {
  const currentDayOfWeek = moment().day();
  const currentWeekIdx = weeks.findIndex((week) =>
    week.includes(currentDayOfWeek)
  );

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
              <th key={day} className="font-weight-bold p-0">
                {day}
              </th>
            ))}
          </tr>
        ) : null}
      </thead>
      <tbody>
        {mini ? (
          weeks[currentWeekIdx].map((dayNum) => (
            <CalendarCell
              dayNum={showDayNum ? dayNum : null}
              val={"6/15"}
              isCurrentDay={dayNum === currentDayOfWeek}
            />
          ))
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
