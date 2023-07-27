const ProfileModel = require('../model/ProfileModel');
const ProfileRepository = require('../repository/ProfileRepository');
const ProfileService = require('../services/ProfileService');

class ProfileController {

    async getProfile(req, res) {
        try {
            const user = req.headers.user;
            const profileService = new ProfileService(ProfileRepository, ProfileModel);
            const profile = await profileService.getProfile(user);
            return res.status(200).json({'profile': profile});
        } catch (error) {
            return res.status(400).json({'erro': error.message});
        }
    }

    async create(req, res) {
        try {
            const profile = req.body;
            const profileService = new ProfileService(ProfileRepository, ProfileModel);
            const newProfile = await profileService.create(profile);
            return res.status(201).json({'profile': newProfile});
        } catch (error) {
            return res.status(400).json({'erro': error.message});
        }
    }

    async actualize(req, res) {
        try {
            const newData = req.body;
            const user = req.headers.user;
            const profileService = new ProfileService(ProfileRepository, ProfileModel);
            const updatedProfile = await profileService.update(newData, user);
            return res.status(200).json({'profile': updatedProfile});
        } catch (error) {
            return res.status(400).json({'erro': error.message});
        }
    }

    async pictureActulize(req, res) {
        try {
            const newData = req.body?.picture;
            const user = req.headers.user;
            const profileService = new ProfileService(ProfileRepository, ProfileModel);
            const updatedPicture = await profileService.updatePicture(newData, user);
            return res.status(200).json({'picture': updatedPicture});
        } catch (error) {
            return res.status(400).json({'erro': error.message});
        }
    }

}

module.exports = new ProfileController();
