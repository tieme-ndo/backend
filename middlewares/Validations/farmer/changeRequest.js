const Joi = require('@hapi/joi');
const joiValidate = require('../../../helpers/joiValidate');

/**
 * Create farmer change request validation schema
 */

const validateString = (maxVal = 30) =>
  Joi.string()
    .min(3)
    .max(maxVal)
    .trim();

const validateEnums = (...enums) => Joi.string().valid(enums);
const validateNumber = () => Joi.number();

const personalInfo = Joi.object().keys({
  title: validateEnums('Miss', 'Mrs', 'Mr', 'Chief'),
  surname: validateString(),
  first_name: validateString(),
  image_url: Joi.string().allow(''),
  middle_name: Joi.string().allow(''),
  marital_status: validateEnums('Single', 'Married', 'Widowed', 'Divorced'),
  gender: validateEnums('Male', 'Female', 'Others'),
  place_of_birth: validateString(50),
  date_of_birth: Joi.date(),
  id_type: validateEnums('Voters Card', 'NHIS', 'National ID', 'Others'),
  id_number: validateString(),
  district: validateString(),
  region: validateString(),
  community_name: validateString(60),
  house_name: validateString(),
  house_number: Joi.string()
    .min(1)
    .max(20)
    .trim(),
  nearest_landmark: validateString(),
  Phone_1: validateString(),
  Phone_2: validateString(),
  education_level: validateEnums(
    'Tertiary',
    'SHS',
    'JHS',
    'Primary',
    'Not Educated'
  ),
  occupation: validateString(),
  expected_income_per_month: validateEnums(
    'Less than GHC 500',
    '501 to GHC 1,000',
    'More than GHC 1,000'
  ),
  major_source_of_income_name: validateString(),
  major_source_of_income_amount: validateNumber(),
  minor_source_of_income_name: validateString(),
  minor_source_of_income_amount: validateNumber()
});

const familyInfo = Joi.object().keys({
  family_size: validateNumber(),
  number_of_dependant: validateNumber(),
  highest_level_of_dependent: validateEnums(
    'Tertiary',
    'SHS',
    'JHS',
    'Primary',
    'Not Educated'
  ),
  family_income_per_month: validateEnums(
    'Less than GHC 500',
    '501 to GHC 1,000',
    'More than GHC 1,000'
  )
});

const guarantor = Joi.object().keys({
  grt_title: validateEnums('Miss', 'Mrs', 'Mr', 'Chief'),
  grt_surname: validateString(),
  grt_first_name: validateString(),
  grt_gender: validateEnums('Male', 'Female', 'Others'),
  grt_relations: validateString(),
  grt_residential_address: validateString(100),
  grt_occupation: validateString(),
  grt_phone: validateString(),
  grt_district: validateString(),
  grt_region: validateString()
});

const farmInfo = Joi.object().keys({
  number_of_acres: validateNumber(),
  location_of_farm: validateString(100),
  farm_nearest_landmark: validateString(100),
  crops_cultivated: Joi.array(),
  animals_or_birds: Joi.array()
});

const farmerSchema = Joi.object().keys({
  personalInfo,
  familyInfo,
  farmInfo,
  guarantor
});

/**
 * Validate user body against defined schema
 */
const changeRequest = (req, res, next) =>
  joiValidate(req, res, next, farmerSchema);

module.exports = changeRequest;
