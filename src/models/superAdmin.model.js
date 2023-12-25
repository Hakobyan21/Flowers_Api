import knex from 'knex';
import knexConfigs from '../../knex.configs';

const pg = knex(knexConfigs.development);

class superAdminModel {
  static async getAllProducts() {
    try {
      let gifts;
      let wreaths;
      let bouquets;
      const selectAdminDetails = await pg('users').select('*').where('role', '=', 'admin');
      for (const i in selectAdminDetails) {
        gifts = await pg('gifts').select('*').where('companyName', '=', selectAdminDetails[i].company_name);
        wreaths = await pg('wreaths').select('*').where('companyName', '=', selectAdminDetails[i].company_name);
        bouquets = await pg('bouquets').select('*').where('companyName', '=', selectAdminDetails[i].company_name);
      }
      return {
        wreaths: [...wreaths],
        bouquets: [...bouquets],
        gifts: [...gifts],
        selectAdminDetails
      };
    } catch (error) {
      console.log(error);
      return 'failed';
    }
  }
}

export default superAdminModel;
