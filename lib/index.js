'use strict';

const SensitiveWords = require('./sensitive-words');

module.exports = app => {
    app.fullSensitivewords = new SensitiveWords();
}