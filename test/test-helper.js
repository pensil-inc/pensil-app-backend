const User = require('../models/user');
const jwt = require('jsonwebtoken');

const TestHelper = {
    /**
     * Get Token using Mobile number
     */
    getTokenUsingMobileNumber: async mobile => {
        // get user
        const user = await User.findOne({
            mobile
        });

        // return token
        return await jwt.sign(user.toObject(), process.env.APP_KEY);
    }
}

module.exports = TestHelper;