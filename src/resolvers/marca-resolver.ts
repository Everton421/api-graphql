import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Marca } from "../dtos/models/marca/marca-model";
import { DateService } from "../service/date-service";
import { MarcasArgs } from "../dtos/args/marca-args";
import { MarcasRepository } from "../repository/marca/marca-repository";
import { CreateMarcasInput } from "../dtos/inputs/marca/create-marcas";
import { UpdateMarcasInput } from "../dtos/inputs/marca/update-marcas";
import { TokenService } from "../service/token-service";
import { GraphQLError } from "graphql";

@Resolver(() => Marca)


export class MarcaResolver {

    dateService = new DateService()
    repository = new MarcasRepository();
    tokenService = new TokenService();
    

    @Query(() => [Marca], { description: "marcas" })
    async findMarcas(@Args() { ativo, codigo, data_cadastro, data_recadastro, descricao, id }: MarcasArgs, @Ctx() context:any ) {
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

    
    @Query(() => Marca, { description: "marca" })
    async findMarca(@Args() { ativo, codigo, data_cadastro, data_recadastro, descricao, id }: MarcasArgs, @Ctx() context:any) {
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

        let arrMarcas = await this.repository.findByParam(params, db)
        let resultMarca = arrMarcas[0]
        return resultMarca
    }


    @Mutation(() => Marca)
    async createMarca(@Arg('dados') dados: CreateMarcasInput, @Ctx() context:any) {
      dados.data_recadastro = this.dateService.obterDataHoraAtual();
        if (!dados.data_cadastro) dados.data_cadastro = this.dateService.obterDataAtual();
        if (!dados.id) dados.id = 0;
        if (!dados.ativo) dados.ativo = 'S';


             if(  !context.req.headers.token  ){
                     return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                } 
            let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );
        
                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  
                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

        let resultCreateMarca = await this.repository.create(dados, db);
        if (resultCreateMarca.insertId > 0) {
            let marcaCreated = await this.repository.findByCode(resultCreateMarca.insertId, db)
            return marcaCreated[0];
        }
    }

    @Mutation(() => Marca)
    async updateMarca(@Arg('dados') dados: UpdateMarcasInput , @Ctx() context:any) {
        dados.data_recadastro = this.dateService.obterDataHoraAtual();
        let validMarca: Marca[] = []
             
         if(  !context.req.headers.token  ){
                     return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                } 
            let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );
        
                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  
                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

        validMarca = await this.repository.findByCode(dados.codigo, db );

        if (validMarca.length > 0) {
            let validUpdatedmarca = await this.repository.update(dados, db );
            if (validUpdatedmarca.serverStatus > 0) {
                let resultMarcaUpdated = await this.repository.findByCode(dados.codigo, db)
                return resultMarcaUpdated[0];
            }
        }

    }


}