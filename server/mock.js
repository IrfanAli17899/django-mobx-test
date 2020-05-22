exports = module.exports = function (app) {
    const { User } = app.db.models;
    const { SHA256 } = require('crypto-js');

    const returnMockUser = () => {
        const random = (Math.random() * 100).toFixed();
        const username = `User${random}`;
        const email = `user${random}@gmail.com`;
        const password = (Math.random() * 1000000).toFixed();
        const hotels = [{ name: 'hotel 1' }, { name: 'hotel 2' }, { name: 'hotel 3' }]
        return {
            username,
            email,
            password,
            hotels
        }
    }

    return async () => {
        try {
            const user = returnMockUser();
            console.log('New User==============>>', user);
            const newUser = new User({
                ...user, password: SHA256(JSON.stringify(user.password) + app.get('passwordSalt')).toString()
            });
            const newUserToSend = await newUser.save();
        } catch (error) {
            console.log('error=====>>', error)
        }
    }
}