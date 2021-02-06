import React from "react";
import { Table } from "react-bootstrap";
export default Calendar;

const calTdStyles = { height: "80px" };

const calendarCell = (dayNum) => (
  <td align="left" className="p-1">
    <span className="text-muted">{dayNum || ""}</span>
  </td>
);

function Calendar({ collapsed = false }) {
  return (
    <Table bordered variant="dark">
      <thead className="border-bottom">
        <tr align="center">
          {!collapsed ? (
            <th className="font-weight-bold" colSpan="7">
              February
            </th>
          ) : null}
        </tr>
        <tr align="center">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <th className="font-weight-bold">{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="border-bottom" style={calTdStyles}>
          {[null, 1, 2, 3, 4, 5, 6].map((dayNum) => calendarCell(dayNum))}
        </tr>
        <tr className="border-bottom" style={calTdStyles}>
          {[7, 8, 9, 10, 11, 12, 13].map((dayNum) => calendarCell(dayNum))}
        </tr>
        <tr className="border-bottom" style={calTdStyles}>
          {[14, 15, 16, 17, 18, 19, 20].map((dayNum) => calendarCell(dayNum))}
        </tr>
        <tr className="border-bottom" style={calTdStyles}>
          {[21, 22, 23, 24, 25, 26, 27].map((dayNum) => calendarCell(dayNum))}
        </tr>
        <tr className="border-bottom" style={calTdStyles}>
          {[28, null, null, null, null, null, null].map((dayNum) =>
            calendarCell(dayNum)
          )}
        </tr>
      </tbody>
    </Table>
  );
}
