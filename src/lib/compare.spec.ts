import {
  CompareResult,
  compare,
} from './compare';

import { test } from 'ava';

test('Compare should emit number of days difference', () => {
  const result: CompareResult = compare('20 12 2017', '22 12 2017');
  console.log('result ', result);
});
