import { ordinalSuffix } from '../helpers/ordinal_suffix.js';
import { pinyinify } from '../helpers/pinyinify.js';

// const data = require('../src/data/test.json');
const data = require('../../src/data/dictionary.json');

// Using HanziJS from https://github.com/nieldlr/hanzi under MIT license
const hanzi = require("hanzi");

export const startHanzi = () => { hanzi.start(); };

const getCharInDict = (char) => {
  return data.find(element => element.character === char);
};

const sortByFrequency = (chars) => {
  return chars.sort((a, b) => {return hanzi.getCharacterFrequency(a).number - hanzi.getCharacterFrequency(b).number});
};

const getAppearsIn = (char) => {
    const chars = hanzi.getCharactersWithComponent(char);
    // If no characters are found with the given component
    // the above function returns string "X not found"
    const returnable = Array.isArray(chars) ? sortByFrequency(chars) : null;
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

const getMatchingCharacters = (char) => {
  const pToMatch = char.etymology.phonetic;
  const sToMatch = char.etymology.semantic;

  const pMatches = data.filter(element => {
    return element?.etymology?.phonetic === pToMatch &&
        element?.etymology?.semantic !== sToMatch });
  const sMatches = data.filter(element => {
    return element?.etymology?.semantic === sToMatch &&
        element?.etymology?.phonetic !== pToMatch });

  const pChars = sortByFrequency(pMatches.map(element => element.character));
  const sChars = sortByFrequency(sMatches.map(element => element.character));

  pChars.unshift(char.character);
  sChars.unshift(char.character);

  return [pChars, sChars];
};

const getNeighbourhoodChar = (charMatchingP, charMatchingS) => {
  const sToMatch = getCharInDict(charMatchingP).etymology.semantic;
  const pToMatch = getCharInDict(charMatchingS).etymology.phonetic;

  const char = data.find((element) => {
    return element?.etymology?.semantic === sToMatch &&
        element?.etymology?.phonetic === pToMatch
  });

  const returnable = char ? char.character : null;
  return returnable;
};

const getNeighbourhood = (char) => {
  if (!char) { return null; }
  if (char?.etymology?.type !== 'pictophonetic') { return null; }
  if (!char.etymology.semantic || !char.etymology.phonetic) { return null; }

  const matchingChars = getMatchingCharacters(char);
  const samePhonetic = matchingChars[0];
  const sameSemantic = matchingChars[1];

  const neighbourhood = sameSemantic.map((charMatchingS) => {
    return samePhonetic.map((charMatchingP) => {
      return getNeighbourhoodChar(charMatchingP, charMatchingS);
    })
  });

  return neighbourhood;
};

export const getCharData = (char) => {
  const charInDict = getCharInDict(char);

  const charData = {
    char: char,
    appearsIn: getAppearsIn(char),
    etymology: getEtymology(charInDict),
    frequency: getFrequency(char),
    neighbourhood: getNeighbourhood(charInDict),
    pronunciations: hanzi.definitionLookup(char)
  };

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
