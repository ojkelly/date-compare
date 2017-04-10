import {
  CompareResult,
  compare,
} from './lib/compare';

function main(): void {
  const result: CompareResult = compare(process.argv[2], process.argv[3]);

  console.log(`${result.earliest}, ${result.latest}, Difference: ${result.difference} days.`);
}

main();
