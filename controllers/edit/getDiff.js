const diff = require('deep-diff');
const { models } = require('../../models');

const getDiff = async edit => {
  const originalFarmerData = await models.Farmer.findById(edit.farmer_id);
  const farmerObject = originalFarmerData.toObject();
  const originalFarmer = {
    personalInfo: farmerObject.personalInfo,
    familyInfo: farmerObject.familyInfo,
    farmInfo: farmerObject.farmInfo,
    guarantor: farmerObject.guarantor
  };
  const differences = await diff(originalFarmer, edit.edited_farmer);

  /* const filteredDifferences = differences.filter(edit => {
    return !edit.path.includes('$init');
  });
 */
  return {
    changes: differences.map(difference => {
      if (difference.kind === 'D') {
        return {
          operation: 'deleted',
          path: difference.path,
          before: difference.lhs,
          after: difference.rhs
        };
      }

      if (difference.kind === 'A') {
        return {
          operation: difference.item.kind === 'N' ? 'added element' : 'removed element',
          path: difference.path,
          before: difference.item.lhs,
          after: difference.item.rhs
        };
      }

      if (difference.kind === 'N') {
        return {
          operation: 'created',
          path: difference.path,
          before: difference.lhs,
          after: difference.rhs
        };
      }

      return {
        operation: 'edited',
        path: difference.path,
        before: difference.lhs,
        after: difference.rhs
      };
    }),
    farmer_id: edit.farmer_id,
    id: edit._id
  };
};

module.exports = getDiff;
