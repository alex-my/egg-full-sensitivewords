'use strict';

const SensitiveWords = require('../lib/sensitive-words');

const sw = new SensitiveWords();
sw.addWords([ '天安门', '毛主席', '周总理' ]);
sw.addWord('管理员');
console.log(`words: ${JSON.stringify(sw.dfaMap.words)}`);

// 输出:
// JSON 格式化工具: https://www.keylala.cn
// words:
// {
//     "天": {
//       "isEnd": 0,
//       "安": {
//         "isEnd": 0,
//         "门": {
//           "isEnd": 1
//         }
//       }
//     },
//     "毛": {
//       "isEnd": 0,
//       "主": {
//         "isEnd": 0,
//         "席": {
//           "isEnd": 1
//         }
//       }
//     },
//     "周": {
//       "isEnd": 0,
//       "总": {
//         "isEnd": 0,
//         "理": {
//           "isEnd": 1
//         }
//       }
//     },
//     "管": {
//       "isEnd": 0,
//       "理": {
//         "isEnd": 0,
//         "员": {
//           "isEnd": 1
//         }
//       }
//     }
//   }


const checkWords = [ '我爱北京天安门', '主席毛泽东同志', '我爱毛主席和周总理' ];
checkWords.forEach((value, index) => {
  console.log('--------------------------------');
  console.log(`value: ${value}, index: ${index}`);
  console.log(`containsDfa: ${sw.containsDfa(value)}`);
  console.log(`wordsDfa: ${JSON.stringify(sw.wordsDfa(value))}`);
});

// 输出:
// --------------------------------
// value: 我爱北京天安门, index: 0
// containsDfa: true
// wordsDfa: ["天安门"]
// --------------------------------
// value: 主席毛泽东同志, index: 1
// containsDfa: false
// wordsDfa: []
// --------------------------------
// value: 我爱毛主席和周总理, index: 2
// containsDfa: true
// wordsDfa: ["毛主席","周总理"]

const replaceWords = [ '我是管理员' ];
replaceWords.forEach((value, index) => {
  console.log('--------------------------------');
  console.log(`value: ${value}, index: ${index}`);
  console.log(`replaceDfa once=true: ${sw.replaceDfa(value, '*', true)}`);
  console.log(`replaceDfa once=false: ${sw.replaceDfa(value, '*', false)}`);
});

// 输出:
// --------------------------------
// value: 管理员, index: 0
// replaceDfa once=true: 我是*
// replaceDfa once=false: 我是***
