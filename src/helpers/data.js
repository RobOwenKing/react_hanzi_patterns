import { ordinalSuffix } from '../helpers/ordinal_suffix.js';
import { pinyinify } from '../helpers/pinyinify.js';

// const data = require('../src/data/test.json');
export const data = require('../../src/data/dictionary.json');

// Using HanziJS from https://github.com/nieldlr/hanzi under MIT license
export const hanzi = require("hanzi");

export const startHanzi = () => { hanzi.start(); };

const getAppearsIn = (char) => {
    const chars = hanzi.getCharactersWithComponent(char);
    // If no characters are found with the given component
    // the above function returns string "X not found"
    const returnable = Array.isArray(chars) ? chars : null;
    return returnable;
};

const getEtymology = (char) => {
  if (!char) { return null; }
  if (!char.etymology) { return null; }

  return char.etymology;
};

const getFrequency = (char) => {
  const freqData = hanzi.getCharacterFrequency(char);
  if (typeof freqData != 'string') {
    return ordinalSuffix(freqData.number);
  } else {
    return null;
  }
};

export const getCharData = (char) => {
  const charInDict = data.find(element => element.character === char);
  const charInHanzi = hanzi.definitionLookup(char);

  const charData = {
    appearsIn: getAppearsIn(char),
    etymology: getEtymology(charInDict),
    frequency: getFrequency(char),
    pronunciations: hanzi.definitionLookup(char)
  };

  /*console.log('charInDict');
  console.log(charInDict);
  console.log('charInHanzi');
  console.log(charInHanzi);*/

  console.log(charData);

  return charData;
};

export const getPinyin = (char) => {
  const pinyin = hanzi.getPinyin(char);
  if (!pinyin) {
    return '?';
  } else {
    const uniques = Array.from(new Set(pinyin));
    return uniques.map((element) => pinyinify(element)).join(', ');
  }
};
