import SmallCharacter from '../components/small_character.jsx';

/*
  Params:  str          - String.   Which might contain characters to convert to <SmallCharacter />s
           clickHandler - Function. To be passed to <SmallCharacter />
           showPinyin   - Boolean.  To be passed to <SmallCharacter />
           classes      - String.   CSS classes for <SmallCharacter />
  Returns: JSX
           The input string, with any Chinese characters as <SmallCharacter />s
  Used in: formatDefinition() from ./format_definition.jsx
           <Etymology />      from ../components/etymology.jsx
*/
export const addSmallCharInStr = (str, clickHandler, showPinyin, classes) => {
  // Use a regex to split the sentence with each Chinese character as string of length 1
  // "Here's a 例句 example sentence" -> ["Here's a ", "例", "句", " example sentence"]
  const components = str.split(/(\p{Script=Han})/u);
  // For each component, if it's a character make it a <SmallCharacter />
  // Else leave it as it is
  const formattedComponents = components.map((component, index) => {
    if (/\p{Script=Han}/u.test(component)) {
      return (
        <SmallCharacter key={index} char={component}
            clickHandler={clickHandler}
            showPinyin={showPinyin}
            classes={classes} />
      );
    } else {
      return component;
    }
  });
  // Reduce the array to be able to return plain JSX
  return formattedComponents.reduce((prev, curr) => [prev, '', curr]);
};
