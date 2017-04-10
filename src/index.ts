import { compare } from './lib/compare';

function main(): void {
  console.log(process.argv);
  process.argv.forEach((val, index, array) => {
    console.log(index + ': ' + val);
  });
  compare('22 11 2001', '29 12 2001');
}
