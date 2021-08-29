import { addSmallCharInStr } from './add_small_chars_in_str.jsx';

/*
  Params:  str          - String.   Which might contain characters to convert to <SmallCharacter />s
           clickHandler - Function. To be passed to <SmallCharacter /> via addSmallCharInStr()
           showPinyin   - Boolean.  To be passed to <SmallCharacter /> via addSmallCharInStr()
           classes      - String.   CSS classes for <SmallCharacter /> via addSmallCharInStr()
  Returns: JSX
           The input string, with any Chinese characters as <SmallCharacter />s and "/" as "; "
  Used in: formatDefinition() from ./format_definition.jsx
           <Etymology />      from ../components/etymology.jsx
*/
export const formatDefinition = (str, clickHandler, showPinyin, classes) => {
  // Prefer '; ' to '/' to separate words/phrases
  // Remove pinyin in square brackets (eg: [Qin2 Shi3 huang2])
  const string = str.replace(/\//g, '; ')
                    .replace(/\[[\w\s]+\]/g,"");
  return addSmallCharInStr(string, clickHandler, showPinyin, "");
};
