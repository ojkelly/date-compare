"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateTimeConfig_1 = require("./dateTimeConfig");
const EPOCH = {
    day: 1,
    month: 1,
    year: 1970,
};
function compare(leftDate, rightDate) {
    const leftDateObject = explodeDate(leftDate, 'leftDate');
    const rightDateObject = explodeDate(rightDate, 'rightDate');
    try {
        validateDate(leftDateObject);
        validateDate(rightDateObject);
    }
    catch (err) {
        throw err;
    }
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
        difference: Math.max(leftEpoch, rightEpoch) - Math.min(leftEpoch, rightEpoch),
    };
}
exports.compare = compare;
function explodeDate(date, type) {
    const explodeDate = date.split(' ');
    try {
        const dateObject = {
            day: parseInt(explodeDate[0]),
            month: parseInt(explodeDate[1]),
            year: parseInt(explodeDate[2]),
        };
        console.log(dateObject);
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
function calculateEpochInDays(date) {
    console.log('arr', [...Array(date.month - 1)].map((_, index) => index + 1));
    const dayNumber = [...Array(date.month - 1)]
        .map((_, index) => index + 1)
        .reduce((acculumaltor, month) => {
        return acculumaltor + dateTimeConfig_1.dateTimeConfig[month - 1].days;
    });
    console.log('dn', dayNumber);
    console.log('epoch', ((date.year * 365) + dayNumber + date.day));
    return ((date.year * 365) + dayNumber + date.day);
}
//# sourceMappingURL=compare.js.map