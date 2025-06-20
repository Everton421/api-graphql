import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Categoria } from "../dtos/models/categoria/categoria-model";
import { DateService } from "../service/date-service";
import { TipoOsRepository } from "../repository/tipo_os/tipo_os-repository";
import { TiposOs } from "../dtos/models/tipos_os/tipos_os-model";
import { TiposOsArgs } from "../dtos/args/tipos_os-args";
import { CreateTiposOsInput } from "../dtos/inputs/tipos_os/create-tipos_os-input";
import { UpdateTiposOsInput } from "../dtos/inputs/tipos_os/update-tipos_os-input";
import { TokenService } from "../service/token-service";
import { GraphQLError } from "graphql";

@Resolver( ()=> Categoria)

    
export class TiposOsResolver{

    repository = new TipoOsRepository() 
    dateService = new DateService()
    tokenService = new TokenService();

    
    @Query(()=> [TiposOs])
    async tiposOs(@Args(){ ativo, codigo, data_cadastro, data_recadastro, descricao, id }:TiposOsArgs, @Ctx() context:any ){
        let params = { 
            ativo, codigo, data_cadastro, data_recadastro, descricao, id 
        }
                    if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``
        
        let result = await this.repository.findByParam(params, db)
            return result
    }
    
    @Query(()=> TiposOs)
    async tipoOs(@Args(){ ativo, codigo, data_cadastro, data_recadastro, descricao, id }:TiposOsArgs, @Ctx() context:any ){
        let params = { 
            ativo, codigo, data_cadastro, data_recadastro, descricao, id 
        }
                 if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``
        
        let arrTiposOS = await this.repository.findByParam(params, db)
        let resultTiposOS = arrTiposOS[0]    
        return resultTiposOS   
    }


    @Mutation(()=> TiposOs)
    async createTipoOs( @Arg('dados') dados:CreateTiposOsInput, @Ctx() context:any){

             if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

        if(!dados.data_recadastro) dados.data_recadastro = this.dateService.obterDataHoraAtual();
        if(!dados.data_cadastro) dados.data_cadastro  = this.dateService.obterDataAtual();
        if(!dados.id) dados.id = 0;
        if(!dados.ativo) dados.ativo = 'S';

           let resultCreate =  await this.repository.create(dados, db);
            if(resultCreate.insertId > 0 ){
                let  itenCreated = await this.repository.findByCode( resultCreate.insertId, db)
                return itenCreated[0];
            }
    }

    @Mutation(()=> TiposOs)
    async updateTipoOs( @Arg('dados') dados: UpdateTiposOsInput, @Ctx() context:any){

     if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

        dados.data_recadastro = this.dateService.obterDataHoraAtual();
           let validTipoOs:TiposOs[]=[]
        validTipoOs = await this.repository.findByCode(dados.codigo, db);
        
        if( validTipoOs.length > 0 ){
            let validUpdateTiposOS= await this.repository.update(dados, db);
                if(validUpdateTiposOS.serverStatus > 0 ){
                    let resultTipoOsUpdated = await this.repository.findByCode(dados.codigo, db)
                    return resultTipoOsUpdated[0];
                }   
        }
    
    }


}