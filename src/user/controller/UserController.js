const req = require('express/lib/request');
const UserModel = require('../model/UserModel');
const UserRepository = require('../repository/UserRepository');
const UserService = require('../services/UserService');

class UserController {
    
    // async getAll(request, response){
    //     try {
    //         const usuario = await UserModel.findAllUsers();
    //         return response.status(200).json(usuario);
    //     } catch (error) {
    //         return response.status(402).json(error.message);
    //     }
    // }

    async getByUser(request, response){
        try {
            const { user } = request.headers;

            const userService = new UserService(UserRepository, UserModel);

            const userData = await userService.getById(user);
            return response.status(200).json(userData);
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }

    async create(request, response){ 
        try {
            const user = request.body;
            const userService = new UserService(UserRepository, UserModel);

            const userCreated = await userService.create(user);
            
            return response.status(201).json(userCreated);       
        } catch (error) {
            return response.status(400).json({ 'erro': error.message });
        }
    }

    async update(request, response){ 
        
        try {
            const { user } = request.headers;
            const userData = request.body;
            const userService = new UserService(UserRepository, UserModel);
            //console.log(request.body);
            const updatedUser = await userService.update(user, userData);
            
            return response.status(201).json(updatedUser);       
        } catch (error) {
            return response.status(500).json({ 'erro': error.message });
        }
    }

    async inativar(request, response){ 
        
        try {
            const { user } = request.headers;
            const userService = new UserService(UserRepository, UserModel);
            //console.log(request.body);
            const updatedUser = await userService.inativar(user);
            
            return response.status(201).json(updatedUser);       
        } catch (error) {
            return response.status(500).json({ 'erro': error.message });
        }
    }

    async ativar(request, response){ 
        
        try {
            const { user } = request.headers;
            const userService = new UserService(UserRepository, UserModel);
            //console.log(request.body);
            const updatedUser = await userService.ativar(user);
            
            return response.status(201).json(updatedUser);       
        } catch (error) {
            return response.status(500).json({ 'erro': error.message });
        }
    }
   
    // async delete(request, response){
    //     try {
    //         const id = request.headers.authorization;
    //         await UserModel.deleteUser(id);
    //         return response.status(204).send();
    //     } catch (error) {
    //         return response.status(404).json(error.message);
    //     }
    // }
    //     async update(request, response) {
    //         try 
    //         {
    //             const id = request.headers.authorization;
    //             await UserModel.updateUser(id, request.body);
    //             return response.status(204).json();
                
    //         } catch (error) {
    //             return response.status(400).json(error.message);
    //         }
    // }

}

module.exports = new UserController();
