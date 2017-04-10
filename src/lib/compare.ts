import { dateTimeConfig } from './dateTimeConfig';

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
  const leftDateObject: DateObject = explodeDate(leftDate, 'leftDate');
  const rightDateObject: DateObject = explodeDate(rightDate, 'rightDate');

  // Validate our dates
  try {
    validateDate(leftDateObject);
    validateDate(rightDateObject);
  } catch (err) {
    throw err;
  }

  const leftEpoch: number = calculateEpochInDays(leftDateObject);
  const rightEpoch: number = calculateEpochInDays(rightDateObject);

  let earliest: DateObject | undefined = undefined;
  let latest: DateObject | undefined = undefined;
  if (Math.max(leftEpoch, rightEpoch) === leftEpoch) {
    earliest = rightDateObject;
    latest = leftDateObject;
  } else {
    earliest = leftDateObject;
    latest = rightDateObject;
  }

  if (typeof earliest === undefined || typeof latest === undefined) {
    throw new Error('An error occured when parsing the dates');
  }

  return {
    earliest: `${earliest.day} ${earliest.month} ${earliest.year}`,
    latest: `${latest.day} ${latest.month} ${latest.year}`,
    // We use min and max here to ensure we don't output a negative value
    difference: Math.max(leftEpoch, rightEpoch) - Math.min(leftEpoch, rightEpoch),
  };
}


function explodeDate(date: string, type: string): DateObject {
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

function calculateEpochInDays(date: DateObject): number {
  // calculate the day number for the year.
  const dayNumber: number =
    [...Array(date.month - 1)] // count each day for every month, except the current one
      .map((_, index: number) => index + 1) // turn the array into something usefule
      .reduce((acculumaltor: number, month: number) => {
        return acculumaltor + dateTimeConfig[month - 1].days;
      });

  return ((date.year * 365) + dayNumber + date.day);
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
};
