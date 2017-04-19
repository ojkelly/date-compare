"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateTimeConfig_1 = require("./dateTimeConfig");
const EPOCH = {
    day: 1,
    month: 1,
    year: 1970,
};
function compare(leftDate, rightDate) {
    const leftDateObject = createDateObject(leftDate, 'leftDate');
    const rightDateObject = createDateObject(rightDate, 'rightDate');
    try {
        validateDate(leftDateObject);
        validateDate(rightDateObject);
    }
    catch (err) {
        throw err;
    }
    const leftDayNumber = dayNumber(leftDateObject.day, leftDateObject.month, leftDateObject.year);
    const rightDayNumber = dayNumber(rightDateObject.day, rightDateObject.month, rightDateObject.year);
    const differenceFromYears = findDifferenceFromYears(leftDateObject.year, rightDateObject.year);
    const differenceFromDayNumbers = (Math.max(leftDayNumber, rightDayNumber) - Math.min(leftDayNumber, rightDayNumber));
    const leftEpoch = calculateEpochInDays(leftDateObject);
    const rightEpoch = calculateEpochInDays(rightDateObject);
    let earliest = undefined;
    let latest = undefined;
    if (Math.max(leftEpoch, rightEpoch) === leftEpoch) {
        earliest = rightDateObject;
        latest = leftDateObject;
    }
    else {
        earliest = leftDateObject;
        latest = rightDateObject;
    }
    if (typeof earliest === undefined || typeof latest === undefined) {
        throw new Error('An error occured when parsing the dates');
    }
    return {
        earliest: `${earliest.day} ${earliest.month} ${earliest.year}`,
        latest: `${latest.day} ${latest.month} ${latest.year}`,
        difference: Math.abs(differenceFromYears - differenceFromDayNumbers),
    };
}
exports.compare = compare;
function createDateObject(date, type) {
    const explodeDate = date.split(' ');
    try {
        const dateObject = {
            day: parseInt(explodeDate[0]),
            month: parseInt(explodeDate[1]),
            year: parseInt(explodeDate[2]),
        };
        return dateObject;
    }
    catch (err) {
        throw new TypeError(`Improperly formatted ${type}, expecting DD MM YYYY`);
    }
}
function validateDate(date) {
    if (date.month < 0) {
        throw new Error('Day is not a positive number.');
    }
    if (date.month > 12) {
        throw new Error('Month is greater than 12');
    }
    if (date.day < 0) {
        throw new Error('Day is not a positive number.');
    }
    const maxDays = dateTimeConfig_1.dateTimeConfig[date.month - 1].days;
    if (date.day >= maxDays) {
        throw new Error(`Day is greater than the max allowed days for that month: ${maxDays}`);
    }
    if (date.year < 1990) {
        throw new Error('Year must be greater than 1990.');
    }
    return true;
}
function dayNumber(day, month, year) {
    const leapYear = isLeapYear(year);
    const monthCount = [...Array(month)]
        .map((_, index) => index - 1)
        .reduce((accumulator, month) => {
        if (leapYear) {
            return accumulator + dateTimeConfig_1.dateTimeConfigLeapYear[month].days;
        }
        return accumulator + dateTimeConfig_1.dateTimeConfig[month].days;
    });
    return monthCount + day + 1;
}
exports.dayNumber = dayNumber;
function findDifferenceFromYears(leftYear, rightYear) {
    const years = [...Array(Math.max(leftYear, rightYear))]
        .map((_, index) => index)
        .slice(Math.min(leftYear, rightYear), Math.max(leftYear, rightYear) + 1);
    return years.reduce((accumulator, year) => {
        if (isLeapYear(year)) {
            return accumulator + 366;
        }
        return accumulator + 365;
    }, 0);
}
exports.findDifferenceFromYears = findDifferenceFromYears;
function calculateEpochInDays(date) {
    const dayCountFromYears = [...Array(date.year)]
        .map((_, index) => index)
        .reduce((accumulator, year) => {
        if (isLeapYear(year)) {
            return accumulator + 366;
        }
        return accumulator + 365;
    }, 0);
    return (dayCountFromYears + dayNumber(date.day, date.month, date.year) + date.day);
}
function isLeapYear(year) {
    return (year % 4 === 0
        && year % 100 !== 0) || year % 400 === 0;
}
exports.isLeapYear = isLeapYear;
//# sourceMappingURL=compare.js.map