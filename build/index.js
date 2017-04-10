"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compare_1 = require("./lib/compare");
function main() {
    const result = compare_1.compare(process.argv[2], process.argv[3]);
    console.log(`${result.earliest}, ${result.latest}, Difference: ${result.difference} days.`);
}
main();
//# sourceMappingURL=index.js.map