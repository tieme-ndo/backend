const mongoose = require('mongoose');

const personalInfo = {
  title: {
    type: String,
    enum: ['Miss', 'Mrs', 'Mr', 'Chief'],
    required: false
  },
  image_url: {
    type: String,
    required: true
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
    enum: ['Single', 'Married', 'Widowed', 'Divorced'],
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Others'],
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
    enum: ['Voters Card', 'NHIS', 'National ID', 'Others'],
    required: true
  },
  id_number: {
    type: Number,
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
  Phone_1: {
    type: Number,
    required: true
  },
  Phone_2: {
    type: Number,
    required: true
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
    enum: ['Less than GHC 500', '501 to GHC 1,000', 'More than GHC 1,000'],
    required: true
  },
  major_source_of_income: {
    name: {
      type: String
    },
    amount: {
      type: Number
    }
  },
  minor_source_of_income: {
    name: {
      type: String
    },
    amount: {
      type: Number
    }
  }
};

const familyInfo = {
  family_size: {
    type: Number,
    required: true
  },
  number_of_dependant: {
    type: Number,
    required: true
  },
  highest_level_of_dependent: {
    type: String,
    enum: ['Tertiary', 'SHS', 'JHS', 'Primary', 'Not Educated'],
    required: true
  },
  family_income_per_month: {
    type: String,
    enum: ['Less than GHC 500', '501 to GHC 1,000', 'More than GHC 1,000'],
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
    enum: ['Male', 'Female', 'Others'],
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
    type: Number,
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
