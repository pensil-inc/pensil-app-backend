const responseHelper = require('../helpers/response_helper');

const Helper = {
    response: responseHelper,
};

global.helper = Helper; 

module.exports = Helper;