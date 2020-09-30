const CountrySeeder = require('./country_seeder');
const RoleSeeder = require('./role_seeder');
const SalesModelSeeder = require('./sales_model_seeder');
const CompanySeeder = require('./company_seeder');
const AdminSeeder = require('./admin_seeder');
const LeadTypeSeeder = require('./lead_type_seeder');
const LeadSourceSeeder = require('./lead_source_seeder');
const Lead = require('../models/lead');

module.exports = class Seeder {
    /**
     *  Drop all databases
     */
    static drop() {
        // call the drop method of all seeders here
    }

    /**
     * Seed all the tables
     */
    static seed() {
        // Sequential Seeder
        // call the seed method of all seeders here
    }
}