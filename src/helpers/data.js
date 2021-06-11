import { pinyinify } from '../helpers/pinyinify.js';

const NEIGHBOURHOOD_MEMO = {};

// Using Make Me A Hanzi data from github.com/skishore/makemeahanzi
// under the GNU Lesser General Public License
const dict = require('../../src/data/dictionary.json');

// Using HanziJS from github.com/nieldlr/hanzi
// under the MIT license
const hanzi = require("hanzi");

export const startHanzi = () => { hanzi.start(); };

const getCharInDict = (char) => {
  return dict.find(element => element.character === char);
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
    return freqData.number;
  } else {
    return null;
  }
};

const fillMatches = (char) => {
  const pToMatch = char.etymology.phonetic;
  const sToMatch = char.etymology.semantic;

  const pMatches = dict.filter(element => {
    return element?.etymology?.phonetic === pToMatch &&
        element?.etymology?.semantic &&
        element?.etymology?.semantic !== sToMatch });
  const sMatches = dict.filter(element => {
    return element?.etymology?.semantic === sToMatch &&
        element?.etymology?.phonetic &&
        element?.etymology?.phonetic !== pToMatch });

  const pChars = sortByFrequency(pMatches.map(element => element.character));
  const sChars = sortByFrequency(sMatches.map(element => element.character));

  pChars.unshift(char.character);
  sChars.unshift(char.character);

  const returnable = {
    phonetic: pChars,
    semantic: sChars
  };

  return returnable;
};

const getNeighbourhoodChar = (charMatchingP, charMatchingS) => {
  const sToMatch = getCharInDict(charMatchingP).etymology.semantic;
  const pToMatch = getCharInDict(charMatchingS).etymology.phonetic;

  if (NEIGHBOURHOOD_MEMO[sToMatch]) {
    if (pToMatch in NEIGHBOURHOOD_MEMO[sToMatch]) {
      return NEIGHBOURHOOD_MEMO[sToMatch][pToMatch];
    }
  } else {
    NEIGHBOURHOOD_MEMO[sToMatch] = {};
  }

  const char = dict.find((element) => {
    return element?.etymology?.semantic === sToMatch &&
        element?.etymology?.phonetic === pToMatch
  });

  const returnable = char ? char.character : null;
  NEIGHBOURHOOD_MEMO[sToMatch][pToMatch] = returnable;

  return returnable;
};

const getMatches = (char) => {
  if (!char) { return null; }
  if (char?.etymology?.type !== 'pictophonetic') { return null; }
  if (!char.etymology.semantic || !char.etymology.phonetic) { return null; }

  return fillMatches(char);
};

const getNeighbourhood = (char) => {
  const matches = getMatches(char);
  const returnable = {
      matches: matches,
      displayedRows: 10,
      displayedCols: 10
    };
  if (matches) {
    returnable.maxRows = matches.semantic.length;
    returnable.maxCols = matches.phonetic.length;
  }

  return returnable;
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

  console.log(charData);

  return charData;
};

export const fillNeighbourhood = (matches, rows, cols) => {
  const sameSemantic = matches["semantic"].slice(0, rows);
  const samePhonetic = matches["phonetic"].slice(0, cols);

  const neighbourhood = sameSemantic.map((charMatchingS) => {
    return samePhonetic.map((charMatchingP) => {
      return getNeighbourhoodChar(charMatchingP, charMatchingS);
    })
  });

  return neighbourhood;
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
