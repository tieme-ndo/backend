const { models } = require('../../models');
const { createError, GENERIC_ERROR } = require('../../helpers/error.js');
const calculateAge = require('../../helpers/calculateAge');

/**
 * @description Get farmers statistic
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const statistics = async (req, res, next) => {
  try {
    const allFarmers = await models.Farmer.find({ archived: false });

    const totalNumOfFarmers = allFarmers.length;

    const totalNumOfFemaleFarmers = allFarmers.filter(
      (farmer) => farmer.personalInfo.gender.toLowerCase() === 'female'
    ).length;

    const totalNumOfMaleFarmers = allFarmers.filter(
      (farmer) => farmer.personalInfo.gender.toLowerCase() === 'male'
    ).length;

    const totalNumOfOtherFarmers = allFarmers.filter(
      (farmer) => farmer.personalInfo.gender.toLowerCase() === 'others'
    ).length;

    const farmersAgeGreaterThanOrEqualThirtyFive = allFarmers.filter(
      (farmer) => calculateAge(farmer.personalInfo.date_of_birth) >= 35
    ).length;

    const farmersAgeLesserThanThirtyFive = allFarmers.filter(
      (farmer) => calculateAge(farmer.personalInfo.date_of_birth) < 35
    ).length;

    const farmerStatisticsInNumbers = {
      totalNumOfFarmers,
      totalNumOfMaleFarmers,
      totalNumOfFemaleFarmers,
      totalNumOfOtherFarmers,
      farmersAgeGreaterThanOrEqualThirtyFive,
      farmersAgeLesserThanThirtyFive
    };

    return res.status(200).json(farmerStatisticsInNumbers);
  } catch (error) {
    return next(
      createError({
        message: 'Could not get farmers statistics',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = statistics;
