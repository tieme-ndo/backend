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

  const ObjectsArrayIsArray =
    Object.prototype.toString.call(ObjectsArray) === "[object Array]";

  if (!ObjectsArrayIsArray) {
    throw new TypeError("Array of objects required as a parameter");
  }

  const objectsArrayCopy = JSON.parse(JSON.stringify(ObjectsArray));

  for (const prop in propertiesPath) {
    // Takes the string property path and splits each of them into an array of properties
    // i.e. ['prop.nested_prop'] => ['prop', 'nested_prop']
    const propertiesArray = propertiesPath[prop].split(".");
    objectsArrayCopy.map(object => {
      // Currently this solution only works with a nested object 2 levels deep
      // TODO: Allow objects with properties nested n deep
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
