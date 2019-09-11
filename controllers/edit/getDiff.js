const diff = require('deep-diff');
const { models } = require('../../models');

const getDiff = async edit => {
  const originalFarmerData = await models.Farmer.findById(edit.farmer_id);
  const originalFarmer = {
    personalInfo: originalFarmerData.personalInfo,
    familyInfo: originalFarmerData.familyInfo,
    farmInfo: originalFarmerData.farmInfo,
    guarantor: originalFarmerData.guarantor
  };
  const differences = await diff(originalFarmer, edit.edited_farmer);

  const filteredDifferences = differences.filter(edit => {
    return !edit.path.includes('$init');
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
    farmer_id: edit.farmer_id
  };
};

module.exports = getDiff;
