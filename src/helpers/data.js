// Used in: getPinyin()
import { pinyinify } from './pinyinify.js';

const DATA_MEMO = {};
const FREQUENCY_MEMO = {};
const NEIGHBOURHOOD_MEMO = {};

// Using Make Me A Hanzi data from github.com/skishore/makemeahanzi
// under the GNU Lesser General Public License
// Used in getCharInDict(), fillMatches(), getNeighbourhoodChar()
const dict = require('../data/dictionary.json');

// Using HanziJS from github.com/nieldlr/hanzi
// under the MIT license
// Used in: startHanzi(), sortByFrequency(),
//          getAppearsInChars(), getAppearsInWords()
//          getCharWithFrequency(), getFrequency()
//          getCharData(), getPinyin()
const hanzi = require("hanzi");

/*
  Returns: N/A
  Action:  Starts Hanzi API
  Used in: componentDidMount() in <App /> from ../App.js
*/
export const startHanzi = () => { hanzi.start(); };

/*
  Params:  char - String. Single Chinese character
  Returns: Object
           The entry in dict (an array of objects) corresponding to the given character
  Used in: getNeighbourhoodChar(), getCharData()
*/
const getCharInDict = (char) => {
  return dict.find(element => element.character === char);
};

/*
  Params:  chars - Array. Each element should be a string, a single Chinese character
  Returns: Array
           The same array with the characters sorted from most to least frequent
  Used in: getAppearsInChars(), fillMatches()
*/
const sortByFrequency = (chars) => {
  // hanzi.getCharacterFrequency() returns an object with various data, we only need the number here
  return chars.sort((a, b) => {return hanzi.getCharacterFrequency(a).number - hanzi.getCharacterFrequency(b).number});
};

/*
  Params:  chars - Array. Each element should be a string, a single Chinese character
  Returns: Array
           The same array with the characters sorted from most to least frequent
  Used in: getAppearsIn()
*/
const getAppearsInChars = (char) => {
  const chars = hanzi.getCharactersWithComponent(char);
  // If no characters are found with the given component
  // the above function returns string "X not found"
  const returnable = Array.isArray(chars) ? sortByFrequency(chars) : null;
  return returnable;
};

/*
  Params:  char - String. A single Chinese character
  Returns: Array
           Each element is an object with keys traditional, simplified, pinyin, definition
           Each object is a word or expression including the given char
  Used in: getAppearsIn()
*/
const getAppearsInWords = (char) => {
  const words = hanzi.getExamples(char);
  // hanzi.getExamples() returns an array of three arrays of objects
  // [[...high frequency], [...medium frequency], [...low frequency]]
  // We want to return a single-level array
  return words[0].concat(words[1], words[2]);
};

/*
  Params:  char - String. A single Chinese character
  Returns: Object
           The object has at least two keys: chars and words (which all include the given char)
           For non-null of the above, there are also max and displayed keys for <ShowMore />
  Used in: getCharData()
*/
const getAppearsIn = (char) => {
  const returnable = {
    chars: getAppearsInChars(char),
    words: getAppearsInWords(char)
  };

  if (returnable.chars?.length) {
    returnable.maxChars = returnable.chars.length;
    returnable.displayedChars = 20;
  }

  if (returnable.words?.length) {
    returnable.maxWords = returnable.words.length;
    returnable.displayedWords = 10;
  }

  return returnable;
};

/*
  Params:  char - Object. An entry from dict
  Returns: Object
           The data under the etymology key in the given argument
  Used in: getCharData()
*/
const getEtymology = (char) => {
  if (!char) { return null; }
  if (!char.etymology) { return null; }

  return char.etymology;
};

/*
  Params:  freq - Integer
  Returns: String
           A single Chinese character with position freq on a frequency list
  Used in: getFrequencyNeighbours(), getFrequencyDots()
*/
export const getCharWithFrequency = (freq) => {
  if (FREQUENCY_MEMO[freq]) { return FREQUENCY_MEMO[freq]; }

  const char = hanzi.getCharacterInFrequencyListByPosition(freq)?.character;
  FREQUENCY_MEMO[freq] = char;
  return char
};

/*
  Params:  freq - Integer
  Returns: Array
           Each element is a string, a single Chinese character
           Up to three characters before and after character at position freq on a frequency list
  Used in: getFrequency()
*/
const getFrequencyNeighbours = (freq) => {
  const neighbours = [];
  for (let i = -3; i <= 3; i+=1) {
    const char = getCharWithFrequency(freq + i);
    if (char) {neighbours.push(char)}
  }
  return neighbours;
};

/*
  Params:  freq - Integer
  Returns: Array
           Two elements, either undefined or a string
  Used in: getFrequency()
*/
const getFrequencyDots = (freq) => {
  // Used simply to tell whether there are more characters beyond
  // those from getFrequencyNeighbours() on the list
  return [
    getCharWithFrequency(freq - 4),
    getCharWithFrequency(freq + 4)
  ];
};

/*
  Params:  char - String. A single Chinese character
  Returns: Object with keys:
             frequency:  String. An integer
             neighbours: Array (max length 7) of Strings
             dots:       Array (length 2) of Strings
        or null
  Used in: getCharData()
*/
const getFrequency = (char) => {
  const freq = hanzi.getCharacterFrequency(char)?.number;
  if (freq) {
    return {
      frequency: freq,
      neighbours: getFrequencyNeighbours(parseInt(freq)),
      dots: getFrequencyDots(parseInt(freq))
    };
  } else {
    return null;
  }
};

/*
  Params:  char - Object. An entry from dict
  Returns: Object with keys:
             phonetic: Array of Strings (each a single character)
             semantic: Array of Strings (each a single character)
           Characters which match the argument in semantic or phonetic component
  Used in: getMatches()
*/
const fillMatches = (char) => {
  // Get the components we will be looking for in other characters
  const pToMatch = char.etymology.phonetic;
  const sToMatch = char.etymology.semantic;

  // Find the characters that share that component
  // To fill the table, we also need them to have data on their other component
  const pMatches = dict.filter(element => {
    return element?.etymology?.phonetic === pToMatch &&
        element?.etymology?.semantic &&
        element?.etymology?.semantic !== sToMatch });
  const sMatches = dict.filter(element => {
    return element?.etymology?.semantic === sToMatch &&
        element?.etymology?.phonetic &&
        element?.etymology?.phonetic !== pToMatch });

  // Filtering dict gives an array of objects - we only want the character Strings
  // Then order them
  const pChars = sortByFrequency(pMatches.map(element => element.character));
  const sChars = sortByFrequency(sMatches.map(element => element.character));

  // To have char in the top-left of the table, add it to the start of both lists
  // In filtering we already made sure it was skipped anywhere else
  pChars.unshift(char.character);
  sChars.unshift(char.character);

  const returnable = {
    phonetic: pChars,
    semantic: sChars
  };

  return returnable;
};

/*
  Params:  charMatchingP - String. A single character with same phonetic as user's search
           charMatchingS - String. A single character with same semantic as user's search
  Returns: String
           A single character
  Used in: fillNeighbourhood()
*/
const getNeighbourhoodChar = (charMatchingP, charMatchingS) => {
  // We need to find the character with the same semantic as charMatchingP
  // and the same phonetic as charMatchingS to fill in the table
  // First, find them in dict and get the necessary component from that data
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
  // Whether a char exists or not, memoize to avoid having to check again later
  NEIGHBOURHOOD_MEMO[sToMatch][pToMatch] = returnable;

  return returnable;
};

/*
  Params:  char - Object. An entry from dict
  Returns: Array of Arrays. See fillMatches()
        or null
  Used in: getNeighbourhood()
*/
const getMatches = (char) => {
  if (!char) { return null; }
  if (char?.etymology?.type !== 'pictophonetic') { return null; }
  if (!char.etymology.semantic || !char.etymology.phonetic) { return null; }

  return fillMatches(char);
};

/*
  Params:  char - Object. An entry from dict
  Returns: Object
  Used in: getCharData()
*/
const getNeighbourhood = (char) => {
  const matches = getMatches(char);

  const returnable = {
      matches: matches
    };

  // We only need these for <ShowMore /> if there's anything to show
  if (matches) {
    returnable.displayedRows = 10;
    returnable.displayedCols = 10;
    returnable.maxRows = matches.semantic.length;
    returnable.maxCols = matches.phonetic.length;
  }

  return returnable;
};

/*
  Params:  char - Object. An entry from dict
  Returns: Array of Objects
  Used in: getCharData()
*/
const getPronunciations = (char) => {
  const defs = hanzi.definitionLookup(char)

  return defs.filter((obj, id, arr) => {
      return arr.findIndex(first => first.definition === obj.definition) === id
    });
};

/*
  Params:  char - String. A single Chinese character
  Returns: Object
  Used in: <App /> from ../App.js
*/
export const getCharData = (char) => {
  if (DATA_MEMO[char]) { return DATA_MEMO[char]; }

  // Some of the helpers require a dict entry
  const charInDict = getCharInDict(char);

  const charData = {
    char: char,
    appearsIn: getAppearsIn(char),
    etymology: getEtymology(charInDict),
    frequency: getFrequency(char),
    neighbourhood: getNeighbourhood(charInDict),
    pronunciations: getPronunciations(char)
  };

  console.log(charData);
  DATA_MEMO[char] = charData;

  return charData;
};

/*
  Params:  matches - Object with two keys
             phonetic and semantic, both Arrays
           rows    - Integer
           cols    - Integer
  Returns: Array of Arrays of Strings
  Used in: <Etymology /> from ../components/etymology.jsx
*/
export const fillNeighbourhood = (matches, rows, cols) => {
  // For speed, we only want to retrieve as many entries as necessary
  const sameSemantic = matches["semantic"].slice(0, rows);
  const samePhonetic = matches["phonetic"].slice(0, cols);

  // Map onto an array of arrays
  // Each entry matches the relevant phonetic and semantic
  const neighbourhood = sameSemantic.map((charMatchingS) => {
    return samePhonetic.map((charMatchingP) => {
      return getNeighbourhoodChar(charMatchingP, charMatchingS);
    })
  });

  return neighbourhood;
};

/*
  Params:  char - String. A single Chinese character
  Returns: String
        or "?"
  Used in: <Etymology />      from ../components/etymology.jsx
           <SmallCharacter /> from ../components/small_character.jsx
*/
export const getPinyin = (char) => {
  const pinyin = hanzi.getPinyin(char);
  if (!pinyin) {
    return '?';
  } else {
    // Strip out any repeated values
    const uniques = Array.from(new Set(pinyin));
    // Convert from numbers to tone marks then join into one String
    return uniques.map((element) => pinyinify(element))
                  .join(', ');
  }
};
