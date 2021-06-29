import SmallCharacter from '../components/small_character.jsx';

export const addSmallCharInStr = (str, clickHandler, showPinyin, classes) => {
  const components = str.split(/(\p{Script=Han})/u);
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
  })
  return formattedComponents.reduce((prev, curr) => [prev, '', curr]);
};