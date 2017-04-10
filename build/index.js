"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compare_1 = require("./lib/compare");
function main() {
    console.log(process.argv);
    process.argv.forEach((val, index, array) => {
        console.log(index + ': ' + val);
    });
    compare_1.compare('22 11 2001', '29 12 2001');
}
//# sourceMappingURL=index.js.map