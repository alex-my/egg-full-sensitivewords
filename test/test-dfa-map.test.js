'use strict';

const DfaMap = require('../lib/dfa-map');
const dfa = new DfaMap();
const words = [ '王八蛋', '王八羔子' ];
dfa.addToHashMap(words);
console.log('----------------- all over -----------------');
console.log(`${JSON.stringify(dfa.words)}`);

// output:
// ----------------- all over -----------------
// {"王":{"isEnd":0,"八":{"isEnd":0,"蛋":{"isEnd":1},"羔":{"isEnd":0,"子":{"isEnd":1}}}}}

dfa.addToHashMap([ '王二羔子' ]);

console.log('----------------- all over -----------------');
console.log(`${JSON.stringify(dfa.words)}`);

// output:
// ----------------- all over -----------------
// {"王":{"isEnd":0,"八":{"isEnd":0,"蛋":{"isEnd":1},"羔":{"isEnd":0,"子":{"isEnd":1}}},"二":{"isEnd":0,"羔":{"isEnd":0,"子":{"isEnd":1}}}}}
