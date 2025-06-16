
import  'dotenv/config'

import { Arg, Mutation, Resolver } from "type-graphql";
import { Login } from "../dtos/models/login/login-model";
import { LoginInput } from "../dtos/inputs/login/login-input";
import { randomUUID } from "node:crypto";
import { User } from "../dtos/models/user/user-model";
import jwt from 'jsonwebtoken';
import { TokenService } from '../service/token-service';

@Resolver(()=>Login) 
export class LoginResolver{

        private tokenService = new TokenService();

    @Mutation(()=>Login)
    async loginService(@Arg('dados') dados:LoginInput ){
            let aux = new Login();
            let token = await this.tokenService.generatedToken( dados.email, dados.senha);
                
            aux.token = token
        let user = {
            codigo: 3,
            nome: 'Jon'
        }
                aux.user =user 
               

            return  aux
    }

}