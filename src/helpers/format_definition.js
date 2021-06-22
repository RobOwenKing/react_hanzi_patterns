import { addSmallCharInStr } from './add_small_chars_in_str.jsx';

export const formatDefinition = (str, clickHandler, showPinyin, classes) => {
  return addSmallCharInStr(str.replace(/\//g, '; '), clickHandler, showPinyin, "");
};
