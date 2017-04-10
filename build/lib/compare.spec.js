"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compare_1 = require("./compare");
const ava_1 = require("ava");
ava_1.test('Compare should emit number of days difference', () => {
    const result = compare_1.compare('20 12 2017', '22 12 2017');
    console.log('result ', result);
});
//# sourceMappingURL=compare.spec.js.map