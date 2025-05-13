import { Args, Query, Resolver } from "type-graphql";
import { Categoria } from "../dtos/models/categoria/categoria-model";
import { CategoriaArgs } from "../dtos/args/categoria-args";
import { CategoriaRepository } from "../repository/categoria/categoria-repository";

@Resolver( ()=> Categoria)

    
export class CategoriaResolver{

    repository = new CategoriaRepository() 

    @Query(()=> [Categoria])
    async findCategorias(@Args(){ ativo, codigo, data_cadastro, data_recadastro, descricao, id }:CategoriaArgs){

        let params = { 
            ativo, codigo, data_cadastro, data_recadastro, descricao, id 
        }
        let result = await this.repository.findByParam(params)
            return result
    }
}