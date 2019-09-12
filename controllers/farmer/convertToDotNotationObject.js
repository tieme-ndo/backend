const dotize = require('dotize');

/*
This function is used to convert the received Object
to a dot notation object in order to make updates
in deep objects using Mongoose
*/
function convertToDotNotationObject(obj) {
  const dotNotationObject = dotize.convert(obj);
  const arraysObject = {};
  Object.keys(dotNotationObject).map(key => {
    if (key.includes('[') && key.includes(']')) {
      const convertedKey = key.split('[')[0];
      if (!(convertedKey in arraysObject)) {
        arraysObject[convertedKey] = [];
      }
      arraysObject[convertedKey].push(dotNotationObject[key]);
    }
  });

  return { ...dotNotationObject, ...arraysObject };
}

module.exports = convertToDotNotationObject;