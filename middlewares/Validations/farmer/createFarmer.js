const Joi = require('@hapi/joi');
const joiValidate = require('../../../helpers/joiValidate');

/**
 * Create user validation schema
 */

const validateString = (maxVal = 25) => Joi.string()
  .min(3)
  .max(maxVal)
  .trim()
  .required();

const validateEnums = (...enums) => Joi.string().valid(enums);
const validateNumber = () => Joi.number().required();

const personalInfo = Joi.object().keys({
  title: validateEnums('Miss', 'Mrs', 'Mr', 'Chief'),
  surname: validateString(),
  first_name: validateString(),
  image_url: Joi.string(),
  middle_name: validateString(),
  marital_status: validateEnums('single', 'married', 'widowed', 'divorced'),
  gender: validateEnums('male', 'female', 'others'),
  place_of_birth: validateString(50),
  date_of_birth: Joi.date().required(),
  id_type: validateEnums('voters card', 'NHIS', 'National ID', 'others'),
  id_number: validateString(),
  district: validateString(),
  region: validateString(),
  community_name: validateString(),
  house_name: validateString(),
  house_number: validateNumber(),
  nearest_landmark: validateString(),
  phone_1: validateString(),
  phone_2: validateString(),
  education_level: validateEnums(
    'Tertiary',
    'SHS',
    'JHS',
    'Primary',
    'Not Educated'
  ),
  occupation: validateString(),
  expected_income_per_month: validateEnums(
    'less than GHC 500',
    '501 to GHC 1,000',
    'more than GHC 1,000'
  ),
  major_source_of_income_name: validateString(),
  major_source_of_income_amount: validateNumber(),
  minor_source_of_income_name: validateString(),
  minor_source_of_income_amount: validateNumber()
});

const familyInfo = Joi.object().keys({
  family_size: validateNumber(),
  number_of_dependants: validateNumber(),
  highest_level_of_dependants: validateEnums(
    'Tertiary',
    'SHS',
    'JHS',
    'Primary',
    'Not Educated'
  ),
  family_income_per_month: validateEnums(
    'less than GHC 500',
    '501 to GHC 1,000',
    'more than GHC 1,000'
  )
});

const guarantor = Joi.object().keys({
  grt_title: validateEnums('Miss', 'Mrs', 'Mr', 'Chief'),
  grt_surname: validateString(),
  grt_first_name: validateString(),
  grt_gender: validateEnums('male', 'female', 'others'),
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
  crops_cultivated: Joi.array().required(),
  animals_or_birds: Joi.array().required()
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
const createFarmer = (req, res, next) => joiValidate(req, res, next, farmerSchema);

module.exports = createFarmer;
