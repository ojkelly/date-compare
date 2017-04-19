import {
  CompareResult,
  compare,
  dayNumber,
  findDifferenceFromYears,
  isLeapYear,
} from './compare';

import { test } from 'ava';

// We know the following array of years are agreed to be leap years
// So we can test the entire set.
const leapYears: number[] = [
  1804, 1808, 1812, 1816, 1820, 1824, 1828, 1832, 1836, 1840, 1844, 1848, 1852, 1856, 1860, 1864,
  1868, 1872, 1876, 1880, 1884, 1888, 1892, 1896, 1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932,
  1936, 1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996,
  2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048, 2052, 2056, 2060,
  2064, 2068, 2072, 2076, 2080, 2084, 2088, 2092, 2096, 2104, 2108, 2112, 2116, 2120, 2124, 2128,
  2132, 2136, 2140, 2144, 2148, 2152, 2156, 2160, 2164, 2168, 2172, 2176, 2180, 2184, 2188, 2192,
  2196, 2204, 2208, 2212, 2216, 2220, 2224, 2228, 2232, 2236, 2240, 2244, 2248, 2252, 2256, 2260,
  2264, 2268, 2272, 2276, 2280, 2284, 2288, 2292, 2296, 2304, 2308, 2312, 2316, 2320, 2324, 2328,
  2332, 2336, 2340, 2344, 2348, 2352, 2356, 2360, 2364, 2368, 2372, 2376, 2380, 2384, 2388, 2392,
  2396, 2400,
];

// ================[ API TESTS ]================ //

test('13 7 1990 and 19 4 2017', (t: any) => {
  const result: CompareResult = compare('13 7 1990', '19 4 2017');
  t.is(result.difference, 9777);
  t.is(result.earliest, '13 7 1990');
  t.is(result.latest, '19 4 2017');
});

test('15 10 1998 and 27 3 2019', (t: any) => {
  const result: CompareResult = compare('15 10 1998', '27 3 2019');
  t.is(result.difference, 7468);
  t.is(result.earliest, '15 10 1998');
  t.is(result.latest, '27 3 2019');
});

test('16 8 2007 and 7 12 2007', (t: any) => {
  const result: CompareResult = compare('16 8 2007', '7 12 2007');
  t.is(result.difference, 113);
  t.is(result.earliest, '16 8 2007');
  t.is(result.latest, '7 12 2007');
});

test('27 3 2004 and 22 5 2004', (t: any) => {
  const result: CompareResult = compare('27 3 2004', '22 5 2004');
  t.is(result.difference, 56);
  t.is(result.earliest, '27 3 2004');
  t.is(result.latest, '22 5 2004');
});


test('should be able to identify leap years', (t: any) => {
  // Test our set of known leap years
  leapYears.forEach((year: number) => {
    t.true(isLeapYear(year));
  });
});

// ================[ UNIT TESTS ]================ //

test('should be able to identify non leap years', (t: any) => {
  // Here we create an array containing the numbers for the years from 1800 to 2400
  // Then we remove the known leap years, and confirm our function can check they
  // are all non-leap years

  // create the array the size of our range
  const years: number[] = [...Array(2400)]
    // Fill it with valaues
    .map((_: any, index: number) => index)
    // slice out the years 1800 to 2400
    .slice(1800, 2400)
    // finally filter out the known leap years
    .filter((year: number) => !leapYears.includes(year));

  // Now check each year in the array, they should all return false
  years.forEach((year: number) => {
    t.false(isLeapYear(year));
  });
});


test('Should be able to identify the day number', (t: any) => {
  interface DayNumberTestItem {
    day: number;
    month: number;
    year: number;
    dayNumber: number;
  }
  const testArray: DayNumberTestItem[] = [
    {
      day: 9,
      month: 8,
      year: 2016,
      dayNumber: 222,
    },
    {
      day: 24,
      month: 1,
      year: 2015,
      dayNumber: 24,
    },
    {
      day: 15,
      month: 9,
      year: 1998,
      dayNumber: 258,
    },
    {
      day: 31,
      month: 12,
      year: 2003,
      dayNumber: 365,
    },
  ];

  testArray.forEach((test: DayNumberTestItem) => {
    t.is(dayNumber(test.day, test.month, test.year), test.dayNumber);
  });
});

test('should be able get the days difference between years', (t: any) => {
  interface YearTestItem {
    leftYear: number;
    rightYear: number;
    difference: number;
  }
  const testArray: YearTestItem[] = [
    {
      leftYear: 2000,
      rightYear: 2010,
      difference: 3653,
    },
    {
      leftYear: 2001,
      rightYear: 2003,
      difference: 730,
    },
    {
      leftYear: 2001,
      rightYear: 2004,
      difference: 1095,
    },
  ];

  testArray.forEach((test: YearTestItem) => {
    t.is(findDifferenceFromYears(test.leftYear, test.rightYear), test.difference);
  });
});
