const checkResult = (result, selector) => {
  console.log(result);
  if (result) {
    return result
  } else {
    console.warn(`Can't found element with selector: ${selector}`);
  }
}

export const getElem = selector => checkResult(document.querySelector(selector), selector);