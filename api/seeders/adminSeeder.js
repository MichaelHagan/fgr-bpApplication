const Admin = require('../models/admins');
const bcrypt = require('bcrypt');

const seed = async() =>{
  let hashedPassword = await bcrypt.hash('L3t$H1r3AsuperSt@r', 10);

  return {
      name: 'HOfficer',
      email: 'hofficer@email.com',
      password: hashedPassword
    };
}

  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await Admin.bulkCreate([await seed()]);
    }
  };