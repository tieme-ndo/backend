const mongoose = require('mongoose');

const personalInfo = {
  title: {
    type: String,
    enum: ['Miss', 'Mrs', 'Mr', 'Chief'],
    required: true
  },
  image_url: {
    type: String
  },
  surname: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  middle_name: {
    type: String,
    required: false
  },
  marital_status: {
    type: String,
    enum: ['single', 'married', 'widowed', 'divorced'],
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    required: true
  },
  place_of_birth: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  id_type: {
    type: String,
    enum: ['voters card', 'NHIS', 'National ID', 'others'],
    required: true
  },
  id_number: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  community_name: {
    type: String,
    required: true
  },
  house_name: {
    type: String,
    required: true
  },
  house_number: {
    type: Number,
    required: true
  },
  nearest_landmark: {
    type: String,
    required: true
  },
  phone_1: {
    type: String,
    required: true
  },
  phone_2: {
    type: String,
    required: false
  },
  education_level: {
    type: String,
    enum: ['Tertiary', 'SHS', 'JHS', 'Primary', 'Not Educated'],
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  expected_income_per_month: {
    type: String,
    enum: ['less than GHC 500', '501 to GHC 1,000', 'more than GHC 1,000'],
    required: true
  },
  major_source_of_income_name: {
    type: String,
    required: true
  },
  major_source_of_income_amount: {
    type: Number,
    required: true
  },
  minor_source_of_income_name: {
    type: String,
    required: true
  },
  minor_source_of_income_amount: {
    type: Number,
    required: true
  },
};

const familyInfo = {
  family_size: {
    type: Number,
    required: true
  },
  number_of_dependants: {
    type: Number,
    required: true
  },
  highest_level_of_dependants: {
    type: String,
    enum: ['Tertiary', 'SHS', 'JHS', 'Primary', 'Not Educated'],
    required: true
  },
  family_income_per_month: {
    type: String,
    enum: ['less than GHC 500', '501 to GHC 1,000', 'more than GHC 1,000'],
    required: true
  }
};

const guarantor = {
  grt_title: {
    type: String,
    enum: ['Miss', 'Mrs', 'Mr', 'Chief'],
    required: true
  },
  grt_surname: {
    type: String,
    required: true
  },
  grt_first_name: {
    type: String,
    required: true
  },
  grt_gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    required: true
  },
  grt_relations: {
    type: String,
    required: true
  },
  grt_residential_address: {
    type: String,
    required: true
  },
  grt_occupation: {
    type: String,
    required: true
  },
  grt_phone: {
    type: String,
    required: true
  },
  grt_district: {
    type: String,
    required: true
  },
  grt_region: {
    type: String,
    required: true
  }
};

const farmInfo = {
  number_of_acres: {
    type: Number,
    required: true
  },
  location_of_farm: {
    type: String,
    required: true
  },
  farm_nearest_landmark: {
    type: String,
    required: true
  },
  crops_cultivated: {
    type: [
      {
        type: String
      }
    ],
    required: true
  },
  animals_or_birds: {
    type: [
      {
        type: String
      }
    ],
    required: true
  }
};

const staff = {
  type: String,
  required: true
};

const archived = {
  type: Boolean,
  default: false
};

const farmerSchema = mongoose.Schema({
  personalInfo,
  farmInfo,
  familyInfo,
  guarantor,
  staff,
  archived
});

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
