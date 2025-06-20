
import  'dotenv/config'

import { Arg, Mutation, Resolver } from "type-graphql";
import { Login } from "../dtos/models/login/login-model";
import { LoginInput } from "../dtos/inputs/login/login-input";
 
import { TokenService } from '../service/token-service';
import { UsuariosRepository } from '../repository/usuarios/usuario-respository';
import { UsuariosApiRepository } from '../repository/usuarios-api-repository/usuarios-api-repositor';
import { IUsuario } from '../repository/usuarios/IUsuario';
import { GraphQLError } from 'graphql';
 
@Resolver(()=>Login) 
export class LoginResolver{

        private tokenService = new TokenService();
        private usuarioRepository = new UsuariosRepository();
        private usuarioApiRepository = new UsuariosApiRepository();

    @Mutation(()=>Login)
    async login(@Arg('dados') dados:LoginInput ){
            let aux = new Login();

            const dataBaseApi = process.env.DB_API;
              if( !dataBaseApi ){
                  console.log("Erro nas variaveis de ambiente, valor informado incorretamente! ", dataBaseApi)
               return new GraphQLError(   'Erro', { extensions:{ code:" CUSTOM_ERROR ", message: "internal server error!" } }  )
              }

            let validUserApi = await this.usuarioApiRepository.findByEmailPassword( dados.email, dados.senha, dataBaseApi  );
              let empresa  =  `\`${validUserApi[0].cnpj}\``;

           let validUserEmpr:IUsuario[]=[] ;

           if( validUserApi.length > 0 ){
               validUserEmpr = await this.usuarioRepository.findByEmailPassword(dados.email, dados.senha,  empresa);
             }else{
              return new GraphQLError(   'Erro', { extensions:{ code:" CUSTOM_ERROR ", message: "Usuario nao foi encontrado!" } }  )
            }   

            if( validUserEmpr.length === 0 ){
             return new GraphQLError(   'Erro', { extensions:{ code:" CUSTOM_ERROR ", message: "Usuario nao foi encontrado!" } }  )
            }

            let token = await this.tokenService.generatedToken( dados.email, dados.senha, validUserEmpr[0].cnpj  );
                
            aux.token = token
                let user = {
                    codigo: Number(validUserEmpr[0].codigo),
                    nome: validUserEmpr[0].nome
                }  

              aux.user = user;  
            
            return  aux
    }

}