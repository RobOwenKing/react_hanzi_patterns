import { ordinalSuffix } from '../helpers/ordinal_suffix.js';

// const data = require('../src/data/test.json');
export const data = require('../../src/data/dictionary.json');

// Using HanziJS from https://github.com/nieldlr/hanzi under MIT license
export const hanzi = require("hanzi");

export const startHanzi = () => { hanzi.start(); };

const getFrequency = (char) => {
  const freqData = hanzi.getCharacterFrequency(char);
  if (typeof freqData != 'string') {
    return ordinalSuffix(freqData.number);
  } else {
    return null;
  }
}

export const getCharData = (char) => {
  const charInDict = data.find(element => element.character === char);
  const charInHanzi = hanzi.definitionLookup(char);

  const charData = {
    frequency: getFrequency(char)
  };

  console.log('charInDict');
  console.log(charInDict);
  console.log('charInHanzi');
  console.log(charInHanzi);

  console.log(charData);

  return charData;
};
