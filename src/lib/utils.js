import moment from "moment";
import { useRef, useEffect } from "react";

export const statusColorLookup = {
  active: "info",
  "on hold": "warning",
  completed: "success",
};

export function calcSkillsAssessments(items) {
  /**
   *  Calculation:
   *  (project length in days x project complexity x % of time skill was used) - (1% x mo from end) +...+ (n projects)
   *
   *  Additional info:
   *  future params - co-worker assessment modifier (beginner, intermediate, expert)
   *  potential params - self-assessed skill level (beginner, intermediate, expert from your perspective)
   */

  let skillCalcs = {};

  // do calculations
  items.forEach(({ tags, start, end, complexity, tagUsage }) => {
    const st = start ? moment(start) : null;
    const en = end ? moment(end) : moment();
    const length = en.diff(st, "days") || null;
    const monthsAfterEnd = moment().diff(en, "months");

    tags.forEach((tag, i) => {
      if (!(tag in skillCalcs)) {
        skillCalcs[tag] = { numUsed: 0, timeUsed: 0, rankIndex: 0 };
      }

      skillCalcs[tag].numUsed++;
      skillCalcs[tag].timeUsed = length
        ? length + skillCalcs[tag].timeUsed
        : skillCalcs[tag].timeUsed;
      skillCalcs[tag].rankIndex =
        length && complexity && tagUsage[i]
          ? length * complexity * tagUsage[i] -
            0.01 * length * complexity * tagUsage[i] * monthsAfterEnd +
            skillCalcs[tag].rankIndex
          : skillCalcs[tag].rankIndex;
    });
  });

  let sortedTagsByNumUsed = Object.keys(skillCalcs)
    .map((key) => ({
      tag: key,
      numUsed: skillCalcs[key].numUsed,
    }))
    .sort((a, b) => b.numUsed - a.numUsed);

  let sortedTagsByTimeUsed = Object.keys(skillCalcs)
    .map((key) => ({
      tag: key,
      timeUsed: skillCalcs[key].timeUsed,
    }))
    .sort((a, b) => b.timeUsed - a.timeUsed);

  let sortedTagsByRank = Object.keys(skillCalcs)
    .map((key) => ({
      tag: key,
      rankIndex: Math.round(skillCalcs[key].rankIndex),
    }))
    .sort((a, b) => b.rankIndex - a.rankIndex);
  let topSix = sortedTagsByRank.slice(0, 6);

  return {
    sortedTagsByNumUsed,
    sortedTagsByTimeUsed,
    sortedTagsByRank,
    topSix,
  };
}

export function createTimeInfo(start, end, lastUpdated, includeDay = false) {
  const format = includeDay ? "MMM D, Y" : "MMM Y";
  const formattedStart = start ? moment(start).format(format) : null;
  const formattedEnd = end ? moment(end).format(format) : null;
  const formattedLastUpdated = lastUpdated
    ? moment(lastUpdated).format(format)
    : null;

  if (start && end) {
    const duration = moment(end).diff(start, "years", true);
    const fDuration = duration > 0.1 ? duration.toFixed(1) : 0;
    return `${formattedStart} - ${formattedEnd} (${fDuration} years)`;
  }

  if (start && lastUpdated) {
    const duration = moment(lastUpdated).diff(start, "years", true);
    const fDuration = duration > 0.1 ? duration.toFixed(1) : 0;
    return `${formattedStart} - ${formattedLastUpdated} (${fDuration} years)`;
  }

  if (start) {
    const duration = moment(moment()).diff(start, "years", true);
    const fDuration = duration > 0.1 ? duration.toFixed(1) : 0;
    return `${formattedStart} - Now (${fDuration} years)`;
  }

  if (end) return formattedEnd;
  if (lastUpdated) return `Last updated ${formattedLastUpdated}`;
  return "No date info available";
}

export const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
};
