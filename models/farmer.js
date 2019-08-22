const mongoose = require('mongoose');

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
    enum: ['Less than GHC 500', '501 to GHC 1,000', 'JHS', 'More than GHC 1,000'],
    required: true
  },
};

const guarantor = {
  title1: {
    type: String,
    enum: ['Miss', 'Mrs', 'Mr', 'Chief'],
    required: false
  },
  surname1: {
    type: String,
    required: true
  },
  first_name1: {
    type: String,
    required: true
  },
  gender1: {
    type: String,
    enum: ['Male', 'Female', 'Others'],
    required: true
  },
  relations: {
    type: String,
    required: true
  },
  residential_address: {
    type: String,
    required: true
  },
  occupation1: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  district1: {
    type: String,
    required: true
  },
  region1: {
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
  nearest_landmark1: {
    type: String,
    required: true
  },
  crops_cultivated: {
    type: Array,
    required: false
  },
  animals_or_birds: {
    type: Array,
    required: false
  }
};

const personalInfo = {
  title: {
    type: String,
    enum: ['Miss', 'Mrs', 'Mr', 'Chief'],
    required: false
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
    enum: ['Voter\'s Card', 'NHIS', 'National ID', 'Others'],
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
    enum: ['Less than GHC 500', '501 to GHC 1,000', 'JHS', 'More than GHC 1,000'],
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
  },
  farmInfo,
  familyInfo,
  guarantor
};

const farmerSchema = new mongoose.Schema({
  personalInfo
});

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
