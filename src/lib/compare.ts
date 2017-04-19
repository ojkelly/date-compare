import {
  dateTimeConfig,
  dateTimeConfigLeapYear,
} from './dateTimeConfig';

const EPOCH: DateObject = {
  day: 1,
  month: 1,
  year: 1970,
};

/**
 * Compare the two date, and if the left date is earlier return the difference in days
 * @param leftDate
 * @param rightDate
 */
function compare(leftDate: string, rightDate: string): CompareResult {
  // Parse our arguments
  const leftDateObject: DateObject = createDateObject(leftDate, 'leftDate');
  const rightDateObject: DateObject = createDateObject(rightDate, 'rightDate');

  // Validate our dates
  try {
    validateDate(leftDateObject);
    validateDate(rightDateObject);
  } catch (err) {
    throw err;
  }

  // get the Day Number for each date
  const leftDayNumber: number = dayNumber(
    leftDateObject.day,
    leftDateObject.month,
    leftDateObject.year,
  );
  const rightDayNumber: number = dayNumber(
    rightDateObject.day,
    rightDateObject.month,
    rightDateObject.year,
  );

  // Calcualte the difference is years, excluding the days
  const differenceFromYears: number = findDifferenceFromYears(leftDateObject.year, rightDateObject.year);

  // Get the difference between the dayNumbers
  const differenceFromDayNumbers: number =
    (Math.max(leftDayNumber, rightDayNumber) - Math.min(leftDayNumber, rightDayNumber));

  // To check the earliest and latest dates, calculate an epoch from 0/0/0000
  const leftEpoch: number = calculateEpochInDays(leftDateObject);
  const rightEpoch: number = calculateEpochInDays(rightDateObject);

  let earliest: DateObject | undefined = undefined;
  let latest: DateObject | undefined = undefined;

  // If the left date is the largest epoch it's the latest, else it's the earliest
  if (Math.max(leftEpoch, rightEpoch) === leftEpoch) {
    earliest = rightDateObject;
    latest = leftDateObject;
  } else {
    earliest = leftDateObject;
    latest = rightDateObject;
  }

  // Check to ensure earliest and latest are defined, something failed otherwise
  if (typeof earliest === undefined || typeof latest === undefined) {
    throw new Error('An error occured when parsing the dates');
  }

  return {
    earliest: `${earliest.day} ${earliest.month} ${earliest.year}`,
    latest: `${latest.day} ${latest.month} ${latest.year}`,
    // We use min and max here to ensure we don't output a negative value
    difference: Math.abs(differenceFromYears - differenceFromDayNumbers),
  };
}

/**
 * From a given string, return a new date object
 * @param date string
 * @param type string used for error signalling
 */
function createDateObject(date: string, type: string): DateObject {
  const explodeDate: string[] = date.split(' ');

  try {
    const dateObject: DateObject = {
      day: parseInt(explodeDate[0]),
      month: parseInt(explodeDate[1]),
      year: parseInt(explodeDate[2]),
    };
    return dateObject;
  } catch (err) {
    throw new TypeError(`Improperly formatted ${type}, expecting DD MM YYYY`);
  }
}

/**
 * Validate the date object, to ensure it fits within the constraints of
 * what a date can be
 * @param date DateObject
 */
function validateDate(date: DateObject): boolean {
  // Validate the months
  if (date.month < 0) {
    throw new Error('Day is not a positive number.');
  }
  // We must validate the month before we can validate the days
  if (date.month > 12) {
    throw new Error('Month is greater than 12');
  }

  // Validate the days
  if (date.day < 0) {
    throw new Error('Day is not a positive number.');
  }
  const maxDays: number = dateTimeConfig[date.month - 1].days;

  if (date.day >= maxDays) {
    throw new Error(`Day is greater than the max allowed days for that month: ${maxDays}`);
  }

  // Validate the years
  if (date.year < 1990) {
    throw new Error('Year must be greater than 1990.');
  }

  return true;
}


/**
 * Calculate the day number.
 * @param days number
 * @param month number
 * @param year number
 */
function dayNumber(day: number, month: number, year: number): number {
  // calculate the day number for the year.
  const leapYear: boolean = isLeapYear(year);
  const monthCount: number = [...Array(month)] // count each day for every month, except the current one
    .map((_: any, index: number) => index - 1) // turn the array into something useful
    .reduce((accumulator: number, month: number) => {
      // If leap year, use a differnt config which gives Feb 29 days.
      if (leapYear) {
        return accumulator + dateTimeConfigLeapYear[month].days;
      }
      return accumulator + dateTimeConfig[month].days;
    });
  return monthCount + day + 1; // plus 1 to include the current day
}

/**
 * Find the difference in days between two years
 * @param leftYear number
 * @param rightYear number
 */
function findDifferenceFromYears(leftYear: number, rightYear: number): number {
  // find the largest year
  const years: number[] =
    // Create an array of the size of the largest year
    [...Array(Math.max(leftYear, rightYear))]
      // fill the array with the years
      .map((_: any, index: number) => index)
      // slice it between the largest and smallest year.
      .slice(Math.min(leftYear, rightYear), Math.max(leftYear, rightYear) + 1);

  return years.reduce((accumulator: number, year: number) => {
    if (isLeapYear(year)) {
      return accumulator + 366;
    }
    return accumulator + 365;
  }, 0); // start the accumulator at 0
}

/**
 * Given a date object calculate an epoch from the year 0/0/0000
 * Used to identify which date is newer
 * @param date DateObject
 */
function calculateEpochInDays(date: DateObject): number {
  // Create an array from the year, and reduce it down from the lenght of the year
  const dayCountFromYears: any = [...Array(date.year)]
    .map((_: any, index: number) => index)
    .reduce((accumulator: number, year: number) => {
      if (isLeapYear(year)) {
        return accumulator + 366;
      }
      return accumulator + 365;
    }, 0); // start the accumulator at 0

  return (dayCountFromYears + dayNumber(date.day, date.month, date.year) + date.day);
}

/**
 * Check to see if this year matches the pattern that identifies it as a Leap Year.
 * @param year number
 */
function isLeapYear(year: number): boolean {
  return (
    year % 4 === 0 // is this year divisble by 4?
    && year % 100 !== 0 // and is this year not divisble by 100
  ) || year % 400 === 0; // or is this year divisble by 400
}


interface DateObject {
  day: number;
  month: number;
  year: number;
}

interface CompareResult {
  earliest: string;
  latest: string;
  difference: number;
}

export {
  compare,
  CompareResult,
  isLeapYear,
  dayNumber,
  findDifferenceFromYears,
};
