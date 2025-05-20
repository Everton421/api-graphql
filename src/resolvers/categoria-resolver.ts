import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Categoria } from "../dtos/models/categoria/categoria-model";
import { CategoriaArgs } from "../dtos/args/categoria-args";
import { CategoriaRepository } from "../repository/categoria/categoria-repository";
import { CreateCategoriaInput } from "../dtos/inputs/categoria/create-categorias";
import { DateService } from "../service/date-service";
import { UpdateCategoriaInput } from "../dtos/inputs/categoria/update-categorias";

@Resolver( ()=> Categoria)

    
export class CategoriaResolver{

    repository = new CategoriaRepository() 
    dateService = new DateService()

    @Query(()=> [Categoria])
    async findCategorias(@Args(){ ativo, codigo, data_cadastro, data_recadastro, descricao, id }:CategoriaArgs){

        let params = { 
            ativo, codigo, data_cadastro, data_recadastro, descricao, id 
        }
        let result = await this.repository.findByParam(params)
            return result
    }
    
    @Query(()=> Categoria)
    async findCategoria(@Args(){ ativo, codigo, data_cadastro, data_recadastro, descricao, id }:CategoriaArgs){

        let params = { 
            ativo, codigo, data_cadastro, data_recadastro, descricao, id 
        }
        let arrCategorias = await this.repository.findByParam(params)
        let resultCategoria = arrCategorias[0]    
        return resultCategoria   
    }


    @Mutation(()=> Categoria)
    async createCategoria( @Arg('dados') dados:CreateCategoriaInput){
        if(!dados.data_recadastro) dados.data_recadastro = this.dateService.obterDataHoraAtual();
        if(!dados.data_cadastro) dados.data_cadastro  = this.dateService.obterDataAtual();
        if(!dados.id) dados.id = 0;
        if(!dados.ativo) dados.ativo = 'S';

           let resultCreateCategoria =  await this.repository.create(dados);
            if(resultCreateCategoria.insertId > 0 ){
                let categoriaCreated = await this.repository.findByCode( resultCreateCategoria.insertId)
                return categoriaCreated[0];
            }
    }

    @Mutation(()=> Categoria)
    async updateCategoria( @Arg('dados') dados: UpdateCategoriaInput){
        dados.data_recadastro = this.dateService.obterDataHoraAtual();
           let validCategoria:Categoria[]=[]
        validCategoria = await this.repository.findByCode(dados.codigo);
        
        if( validCategoria.length > 0 ){
            let validUpdateCategory = await this.repository.update(dados);
                if(validUpdateCategory.serverStatus > 0 ){
                    let resultCategoriaUpdated = await this.repository.findByCode(dados.codigo)
                    return resultCategoriaUpdated[0];
                }   
        }
    
    }


}