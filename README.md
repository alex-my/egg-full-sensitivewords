## 说明

- `egg`插件，提供敏感词检测，替换功能
- 使用以下算法
  - `DFA` 性能优秀
  - `DAT` (待实现)，针对小文本过滤，比如用户名

## 安装

```bash
$ npm i egg-full-sensitivewords --save
```

## 使用

```js
// config/plugin.js
exports.fullSensitivewords = {
  enable: true,
  package: 'egg-full-sensitivewords',
};
```

## 示例

- 可以通过`app.fullSensitivewords`来调用
- 测试示例见 [test-dfa](./test/test-dfa.js)
- 所有接口的示例如下:

```js
// 初始化敏感词库，建议在启动的时候执行
app.fullSensitivewords.addWords(['天安门', '毛主席', '周总理']);
app.fullSensitivewords.addWord('管理员');

// 判断是否包含敏感词，返回值 true: 包含; false: 不包含
app.fullSensitivewords.containsDfa('我爱北京天安门'); // => true
app.fullSensitivewords.containsDfa('主席毛泽东同志'); // => false

// 获取含有的敏感词内容，返回值 字符串数组
app.fullSensitivewords.wordsDfa('我爱毛主席和周总理'); // => ['毛主席', '周总理']

// 替换敏感词，当once=true时，对于每一个出现的敏感词，只替换一次。默认 once = false
app.fullSensitivewords.replaceDfa('我是管理员', '*', true); // => 我是*
// 替换敏感词, 当once=false时，对于每一个出现的敏感词，按照其长度替换。默认 once = false
app.fullSensitivewords.replaceDfa('我是管理员', '*', false); // => 我是***
```

## License

[MIT](LICENSE)
