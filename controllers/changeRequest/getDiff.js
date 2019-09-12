const diff = require('deep-diff');
const { models } = require('../../models');

const getDiff = async changeRequest => {
  const originalFarmerData = await models.Farmer.findById(changeRequest.farmer_id);
  const originalFarmer = {
    personalInfo: originalFarmerData.personalInfo,
    familyInfo: originalFarmerData.familyInfo,
    farmInfo: originalFarmerData.farmInfo,
    guarantor: originalFarmerData.guarantor
  };
  const differences = await diff(originalFarmer, changeRequest.edited_farmer);

  const filteredDifferences = differences.filter(changeRequest => {
    return !changeRequest.path.includes('$init');
  });

  return {
    changes: filteredDifferences.map(difference => {
      if (difference.kind === 'D') {
        return {
          operation: 'deleted',
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
