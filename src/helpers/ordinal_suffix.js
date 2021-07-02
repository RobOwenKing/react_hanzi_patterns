// From: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number

/*
  Params:  i - Integer.
  Returns: String
           i with the correct suffix as an ordinal number
  Used in: <Frequency /> from ../components/frequency.jsx
*/
export const ordinalSuffix = i => {
    const j = i % 10,
          k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
};
