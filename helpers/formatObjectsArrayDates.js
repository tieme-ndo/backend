/**
 * @description format any valid date values in a given array of objects
 *
 * @param {array} propertyPath
 * @param {array} ObjectsArray
 * @returns {array}
 *
 */

const formatObjectsArrayDates = (propertiesPath = [], ObjectsArray) => {
  if (ObjectsArray === undefined) {
    throw new Error("Make sure you pass in an array of objects");
  }

  const objectIsArray =
    Object.prototype.toString.call(ObjectsArray) === "[object Array]";

  if (!objectIsArray) {
    throw new TypeError("Array of objects required as a parameter");
  }

  const objectsArrayCopy = JSON.parse(JSON.stringify(ObjectsArray));

  for (const prop in propertiesPath) {
    // takes the string property path and splits each of them into an array of properties
    // i.e. ['prop.nested_prop'] => ['prop', 'nested_prop']
    const propertiesArray = propertiesPath[prop].split(".");
    objectsArrayCopy.map(object => {
      propertiesArray.reduce((firstProperty, nestedProperty) => {
        if (!!(firstProperty && nestedProperty)) {
          object[firstProperty][nestedProperty] = object[firstProperty][
            nestedProperty
          ].split("T")[0];
        }
      });
    });
  }

  return objectsArrayCopy;
};

module.exports = formatObjectsArrayDates;
