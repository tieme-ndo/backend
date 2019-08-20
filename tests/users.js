/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const {conn, User, drop} = require('../models')

chai.should();

chai.use(chaiHttp);


before(() => {
      
  });