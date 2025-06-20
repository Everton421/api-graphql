import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Categoria } from "../dtos/models/categoria/categoria-model";
import { CategoriaArgs } from "../dtos/args/categoria-args";
import { CategoriaRepository } from "../repository/categoria/categoria-repository";
import { CreateCategoriaInput } from "../dtos/inputs/categoria/create-categorias";
import { DateService } from "../service/date-service";
import { UpdateCategoriaInput } from "../dtos/inputs/categoria/update-categorias";
import { GraphQLError } from "graphql";
import { TokenService } from "../service/token-service";

@Resolver( ()=> Categoria)

    
export class CategoriaResolver{

    repository = new CategoriaRepository() 
    dateService = new DateService()
    tokenService = new TokenService();

    @Query(()=> [Categoria])
    async findCategorias(@Args(){ ativo, codigo, data_cadastro, data_recadastro, descricao, id }:CategoriaArgs, @Ctx() context:any ){

                     if(  !context.req.headers.token  ){
                            return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                         } 
                    let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );
        
                      if(decoded.erro || decoded.payload === undefined) {
                             return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                       }  
        
                         let cnpj = decoded.payload?.cnpj;
                           let db =   `\`${cnpj}\``

        let params = { 
            ativo, codigo, data_cadastro, data_recadastro, descricao, id 
        }
        let result = await this.repository.findByParam(params, db )
            return result
    }
    
    @Query(()=> Categoria)
    async findCategoria(@Args(){ ativo, codigo, data_cadastro, data_recadastro, descricao, id }:CategoriaArgs, @Ctx() context:any){

             if(  !context.req.headers.token  ){
                            return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                         } 
                    let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );
        
                      if(decoded.erro || decoded.payload === undefined) {
                             return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                       }  
        
                         let cnpj = decoded.payload?.cnpj;
                           let db =   `\`${cnpj}\``

        let params = { 
            ativo, codigo, data_cadastro, data_recadastro, descricao, id 
        }
        let arrCategorias = await this.repository.findByParam(params, db)
        let resultCategoria = arrCategorias[0]    
        return resultCategoria   
    }


    @Mutation(()=> Categoria)
    async createCategoria( @Arg('dados') dados:CreateCategoriaInput, @Ctx() context:any ){
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
        if(!dados.data_cadastro) dados.data_cadastro  = this.dateService.obterDataAtual();
        if(!dados.id) dados.id = 0;
        if(!dados.ativo) dados.ativo = 'S';

           let resultCreateCategoria =  await this.repository.create(dados, db);
            if(resultCreateCategoria.insertId > 0 ){
                let categoriaCreated = await this.repository.findByCode( resultCreateCategoria.insertId, db)
                return categoriaCreated[0];
            }
    }

    @Mutation(()=> Categoria)
    async updateCategoria( @Arg('dados') dados: UpdateCategoriaInput, @Ctx() context:any){
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
           let validCategoria:Categoria[]=[]
        validCategoria = await this.repository.findByCode(dados.codigo, db );
        
        if( validCategoria.length > 0 ){
            let validUpdateCategory = await this.repository.update(dados, db);
                if(validUpdateCategory.serverStatus > 0 ){
                    let resultCategoriaUpdated = await this.repository.findByCode(dados.codigo, db)
                    return resultCategoriaUpdated[0];
                }   
        }
    
    }


}