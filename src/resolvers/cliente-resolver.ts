import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Cliente } from "../dtos/models/clientes/cliente-model"; 
import { ClienteArgs } from "../dtos/args/cliente-args";
import { ClienteRepository } from "../repository/cliente/cliente-repository";
import { CreateClienteInput } from "../dtos/inputs/cliente/create-cliente-input";
import { DateService } from "../service/date-service";
import { UpdateClienteInput } from "../dtos/inputs/cliente/update-cliente-input";
import { TokenService } from "../service/token-service";
import { GraphQLError } from "graphql";


@Resolver (()=> Cliente)
export class ClienteResolver{
 
    repository = new ClienteRepository();
    dateService = new DateService();
    tokenService = new TokenService();

@Query(()=>[Cliente])
    async clientes( @Args(){  ativo, cnpj, codigo, data_recadastro, id, nome, vendedor}: ClienteArgs, @Ctx() context:any){
         
        let param :ClienteArgs ={
            ativo:ativo,
            cnpj:cnpj,
            codigo:codigo,
            data_recadastro:data_recadastro,
            id:id,
            nome:nome,
            vendedor:vendedor
        }

              if(  !context.req.headers.token  ){
                            return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                        } 
                        let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                        if(decoded.erro || decoded.payload === undefined) {
                            return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                        }  

                            let dadosCnpj = decoded.payload?.cnpj;
                        let db =   `\`${dadosCnpj}\``

            let aux = await  this.repository.findByParam(param, db);
             return aux 
    }

@Query(()=> Cliente)
    async cliente (@Args(){ ativo, cnpj, codigo, data_recadastro,id,nome,vendedor}:ClienteArgs, @Ctx() context:any){

               if(  !context.req.headers.token  ){
                            return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                        } 
                        let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                        if(decoded.erro || decoded.payload === undefined) {
                            return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                        }  

                            let dadosCnpj = decoded.payload?.cnpj;
                        let db =   `\`${dadosCnpj}\``
        let param :ClienteArgs ={
            ativo:ativo,
            cnpj:cnpj,
            codigo:codigo,
            data_recadastro:data_recadastro,
            id:id,
            nome:nome,
            vendedor:vendedor
        }
            let arrResult = await  this.repository.findByParam(param, db);
            let resultClient = arrResult[0];
            return resultClient 
    }

@Mutation(()=> Cliente)
async createCliente( @Arg('dados') dados:CreateClienteInput, @Ctx() context:any){
         if(  !context.req.headers.token  ){
                            return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                        } 
                        let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                        if(decoded.erro || decoded.payload === undefined) {
                            return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                        }  

                            let dadosCnpj = decoded.payload?.cnpj;
                        let db =   `\`${dadosCnpj}\``

    if(!dados.data_cadastro){
     dados.data_cadastro = this.dateService.obterDataAtual();
    }
    dados.data_recadastro = this.dateService.obterDataHoraAtual();
    if( !dados.ativo ) dados.ativo = "S";

    let resultInsertCliente = await this.repository.insert(dados, db)
    let clientCreated:Cliente[] = []; 
    if ( resultInsertCliente.insertId >  0 ){
            clientCreated = await this.repository.findByCode(resultInsertCliente.insertId,  db )
     }

     if( clientCreated?.length > 0 ){
        return clientCreated[0]
     }

    }

@Mutation(()=> Cliente)
async updateCliente(@Arg('dados') dados:UpdateClienteInput, @Ctx() context:any ){
            if( !context.req.headers.token  ){
                            return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                        } 
                        let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                        if(decoded.erro || decoded.payload === undefined) {
                            return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                        }  

                            let dadosCnpj = decoded.payload?.cnpj;
                        let db =   `\`${dadosCnpj}\``


    let verifiClient = await this.repository.findByCode(dados.codigo, db )
    dados.data_recadastro = this.dateService.obterDataHoraAtual();

    let resultUpdateCliente;
        if( verifiClient.length > 0 ){
            resultUpdateCliente = await this.repository.update(dados, db);
        }
    let arrClienteUpdated:Cliente[];  

        if( resultUpdateCliente && resultUpdateCliente?.serverStatus > 0 ){
            arrClienteUpdated = await this.repository.findByCode(dados.codigo , db)
            return arrClienteUpdated[0]
        }
}

}