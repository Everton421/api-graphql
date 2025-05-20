import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Categoria } from "../dtos/models/categoria/categoria-model";
import { CategoriaArgs } from "../dtos/args/categoria-args";
import { CategoriaRepository } from "../repository/categoria/categoria-repository";
import { CreateCategoriaInput } from "../dtos/inputs/categoria/create-categorias";
import { DateService } from "../service/date-service";
import { UpdateCategoriaInput } from "../dtos/inputs/categoria/update-categorias";
import { TipoOsRepository } from "../repository/tipo_os/tipo_os-repository";
import { TiposOs } from "../dtos/models/tipos_os/tipos_os-model";
import { TiposOsArgs } from "../dtos/args/tipos_os-args";
import { CreateTiposOsInput } from "../dtos/inputs/tipos_os/create-tipos_os-input";
import { UpdateTiposOsInput } from "../dtos/inputs/tipos_os/update-tipos_os-input";

@Resolver( ()=> Categoria)

    
export class TiposOsResolver{

    repository = new TipoOsRepository() 
    dateService = new DateService()

    
    @Query(()=> [TiposOs])
    async findTiposOs(@Args(){ ativo, codigo, data_cadastro, data_recadastro, descricao, id }:TiposOsArgs){
        let params = { 
            ativo, codigo, data_cadastro, data_recadastro, descricao, id 
        }
        let result = await this.repository.findByParam(params)
            return result
    }
    
    @Query(()=> TiposOs)
    async findTipoOs(@Args(){ ativo, codigo, data_cadastro, data_recadastro, descricao, id }:TiposOsArgs){
        let params = { 
            ativo, codigo, data_cadastro, data_recadastro, descricao, id 
        }
        let arrTiposOS = await this.repository.findByParam(params)
        let resultTiposOS = arrTiposOS[0]    
        return resultTiposOS   
    }


    @Mutation(()=> TiposOs)
    async createTipoOs( @Arg('dados') dados:CreateTiposOsInput){
        if(!dados.data_recadastro) dados.data_recadastro = this.dateService.obterDataHoraAtual();
        if(!dados.data_cadastro) dados.data_cadastro  = this.dateService.obterDataAtual();
        if(!dados.id) dados.id = 0;
        if(!dados.ativo) dados.ativo = 'S';

           let resultCreate =  await this.repository.create(dados);
            if(resultCreate.insertId > 0 ){
                let  itenCreated = await this.repository.findByCode( resultCreate.insertId)
                return itenCreated[0];
            }
    }

    @Mutation(()=> TiposOs)
    async updateTipoOs( @Arg('dados') dados: UpdateTiposOsInput){
        dados.data_recadastro = this.dateService.obterDataHoraAtual();
           let validTipoOs:TiposOs[]=[]
        validTipoOs = await this.repository.findByCode(dados.codigo);
        
        if( validTipoOs.length > 0 ){
            let validUpdateTiposOS= await this.repository.update(dados);
                if(validUpdateTiposOS.serverStatus > 0 ){
                    let resultTipoOsUpdated = await this.repository.findByCode(dados.codigo)
                    return resultTipoOsUpdated[0];
                }   
        }
    
    }


}