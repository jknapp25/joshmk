import moment from "moment";

export function calculateSkillsAssessments(items) {
  let skillCalcs = {};

  //project length
  //% of time skill was used (0-1)
  //project complexity (0-1)
  //# of projects
  //potential: self-assessed skill level beginner, intermediate, expert from your perspective
  //future: modifier of beginner, intermediate, expert from co-workers perspective
  //(project length in days x project complexity x % of time skill was used) - (1% x mo from end) +...+ (n projects)

  // get calculations
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
    .map(key => ({
      tag: key,
      numUsed: skillCalcs[key].numUsed
    }))
    .sort((a, b) => b.numUsed - a.numUsed);

  let sortedTagsByTimeUsed = Object.keys(skillCalcs)
    .map(key => ({
      tag: key,
      timeUsed: skillCalcs[key].timeUsed
    }))
    .sort((a, b) => b.timeUsed - a.timeUsed);

  let sortedTagsByRank = Object.keys(skillCalcs)
    .map(key => ({
      tag: key,
      rankIndex: Math.round(skillCalcs[key].rankIndex)
    }))
    .sort((a, b) => b.rankIndex - a.rankIndex);
  let topSix = sortedTagsByRank.slice(0, 6);

  return {
    sortedTagsByNumUsed,
    sortedTagsByTimeUsed,
    sortedTagsByRank,
    topSix
  };
}
