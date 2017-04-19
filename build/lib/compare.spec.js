"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compare_1 = require("./compare");
const ava_1 = require("ava");
const leapYears = [
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
ava_1.test('13 7 1990 and 19 4 2017', (t) => {
    const result = compare_1.compare('13 7 1990', '19 4 2017');
    t.is(result.difference, 9777);
    t.is(result.earliest, '13 7 1990');
    t.is(result.latest, '19 4 2017');
});
ava_1.test('15 10 1998 and 27 3 2019', (t) => {
    const result = compare_1.compare('15 10 1998', '27 3 2019');
    t.is(result.difference, 7468);
    t.is(result.earliest, '15 10 1998');
    t.is(result.latest, '27 3 2019');
});
ava_1.test('16 8 2007 and 7 12 2007', (t) => {
    const result = compare_1.compare('16 8 2007', '7 12 2007');
    t.is(result.difference, 113);
    t.is(result.earliest, '16 8 2007');
    t.is(result.latest, '7 12 2007');
});
ava_1.test('27 3 2004 and 22 5 2004', (t) => {
    const result = compare_1.compare('27 3 2004', '22 5 2004');
    t.is(result.difference, 56);
    t.is(result.earliest, '27 3 2004');
    t.is(result.latest, '22 5 2004');
});
ava_1.test('should be able to identify leap years', (t) => {
    leapYears.forEach((year) => {
        t.true(compare_1.isLeapYear(year));
    });
});
ava_1.test('should be able to identify non leap years', (t) => {
    const years = [...Array(2400)]
        .map((_, index) => index)
        .slice(1800, 2400)
        .filter((year) => !leapYears.includes(year));
    years.forEach((year) => {
        t.false(compare_1.isLeapYear(year));
    });
});
ava_1.test('Should be able to identify the day number', (t) => {
    const testArray = [
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
    testArray.forEach((test) => {
        t.is(compare_1.dayNumber(test.day, test.month, test.year), test.dayNumber);
    });
});
ava_1.test('should be able get the days difference between years', (t) => {
    const testArray = [
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
    testArray.forEach((test) => {
        t.is(compare_1.findDifferenceFromYears(test.leftYear, test.rightYear), test.difference);
    });
});
//# sourceMappingURL=compare.spec.js.map