const connection = require('../../infra/database');

class ProfileRepository {

    async findProfile(user) {
        try {
            console.log(user);
            return {
                "name": "André Vitor",
                "picture": "andrevitor103-20220430-08:41:46:12",
                "biographfy": "Eu sou o André",
                "contacts": [2,4,6,8],
                "id_address": 4,
                "id_account": 2
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async insert(data) {
        try {
            console.log('salvando...');
            console.log(data);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(user, data) {
        try {
            console.log('alterando...');
            console.log({'user': user, 'profile': data});
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new ProfileRepository();
