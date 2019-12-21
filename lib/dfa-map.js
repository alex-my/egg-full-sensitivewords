'use strict';

/**
 * DFA 算法
 * 敏感词库
 */

class DfaMap {
  constructor() {
    this._maps = {};
  }

  get words() {
    return this._maps;
  }

  /**
     * 构建敏感词词库
     * @param {Array} words : ['word', ...]
     */
  addToHashMap(words) {
    /**
         * words: ["王八蛋", "王八羔子"] 构成以下内容
         *
         * 王 -> 八 -> 蛋
         *         -> 羔  -> 子
         *
         * JSON解析: https://www.keylala.cn
         * {
         *   "王": {
         *     "isEnd": 0,
         *     "八": {
         *         "isEnd": 0,
         *         "蛋": {
         *             "isEnd": 1
         *         },
         *         "羔": {
         *            "isEnd": 0,
         *            "子": {
         *                "isEnd": 1
         *             }
         *           }
         *         }
         *     }
         * }
         */
    let key = null;
    let keyChar = null;
    let wordMap = null;
    let newMap = null;
    let nowMap = null;
    for (let i = 0; i < words.length; i++) {
      nowMap = this._maps;
      // key 敏感字 (eg: 王八蛋)
      key = words[i];
      // 给每个敏感词语构造一棵树
      for (let j = 0; j < key.length; j++) {
        // 取出该敏感词语的每个词 (eg: 王)
        keyChar = key[j];
        // 敏感词库中是否已经有该词，(eg: 以'王'为起始点的树)
        wordMap = nowMap[keyChar];
        // 如果词库中存在该词，存在以它为首的这棵树，则接下来，用这颗树继续往下编
        if (wordMap) {
          nowMap = wordMap;
        } else {
          // 没有，则以它为起点，构造一颗新树
          newMap = {};
          // 不是最后一个
          newMap.isEnd = 0;
          // 添加新树 (实际添加到了 this._maps) 中
          nowMap[keyChar] = newMap;
          // 后续使用这颗新树
          nowMap = newMap;
        }
        if (j === key.length - 1) {
          nowMap.isEnd = 1;
        }
      }
    }
  }
}

module.exports = DfaMap;
