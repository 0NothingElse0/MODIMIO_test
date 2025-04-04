import userServiceBase from "../services/userServiceBase.js";
import {User} from "../models/userModel.js";


    const login = process.env.npm_config_login;
    const password = process.env.npm_config_password;
    if(!login){
        console.log('Param login is required')
    }
    if(!password){
        console.log('Param password is required')
    }
    if(login && password){
        await userServiceBase.register(new User({
            login,
            password,
            role: 'admin',
            isActivate: true,
        }));
        console.log('Account created success');
    }



