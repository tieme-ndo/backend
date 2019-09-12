const diff = require('deep-diff');
const { models } = require('../../models');

const getDiff = async changeRequest => {
  const originalFarmerData = await models.Farmer.findById(changeRequest.farmer_id);
  const farmerObject = originalFarmerData.toObject();
  const originalFarmer = {
    personalInfo: farmerObject.personalInfo,
    familyInfo: farmerObject.familyInfo,
    farmInfo: farmerObject.farmInfo,
    guarantor: farmerObject.guarantor
  };
  const differences = await diff(originalFarmer, changeRequest.edited_farmer);

  const filteredDifferences = differences.filter(changeRequest => {
    return !changeRequest.path.includes('$init');
  });

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
    farmer_id: changeRequest.farmer_id,
    id: changeRequest._id
  };
};

module.exports = getDiff;
