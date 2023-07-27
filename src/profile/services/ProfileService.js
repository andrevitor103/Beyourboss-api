
class ProfileService {
    
    constructor(repository, profile) {
        this._repository = repository;
        this._profile = profile;
        console.log(this._profile);
    }

    async getProfile(user) {
        try {
            const profile = await this._repository.findProfile(user);
            return profile;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(data) {
        try {
            const profileModel = await this._profile.create(data);
            console.log(profileModel);
            const profile = await this._repository.insert(profileModel);
        } catch (error) {
            throw new Error(error.message);
        }
        //const newProfile = this._repository.insert(profile);
    }

    async update(data, user) {
        try {
            const profile = await this._repository.findProfile(user);//user que está dentro de account
            const profileModel = new this._profile(profile);
            await profileModel.profileActualize(data);  
            console.log(profileModel);
            const profileUpdated = await this._repository.update(user, profileModel);
        } catch (error) {
            throw new Error(error.message);
        }
        //const newProfile = this._repository.insert(profile);
    }

    async updatePicture(data, user) {
        try {
            const profile = await this._repository.getProfile(user);//user que está dentro de account
            const profileModel = new this._profile(profile);
            await profileModel.pictureActualize(data);
            console.log(profileModel);
        } catch (error) {
            throw new Error(error.message);
        }
        //const newProfile = this._repository.insert(profile);
    }
}

module.exports = ProfileService;
