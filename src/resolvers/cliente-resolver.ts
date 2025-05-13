import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Cliente } from "../dtos/models/clientes/cliente-model"; 
import { ClienteArgs } from "../dtos/args/cliente-args";
import { ClienteRepository } from "../repository/cliente/cliente-repository";
import { CreateClienteInput } from "../dtos/inputs/cliente/create-cliente-input";
import { DateService } from "../service/date-service";
import { UpdateClienteInput } from "../dtos/inputs/cliente/update-cliente-input";
import { GraphQLError } from "graphql";


@Resolver (()=> Cliente)
export class ClienteResolver{
 
    repository = new ClienteRepository();
    dateService = new DateService();

@Query(()=>[Cliente])
    async clientes( @Args(){  ativo, cnpj, codigo, data_recadastro, id, nome, vendedor}: ClienteArgs){
         
        let param :ClienteArgs ={
            ativo:ativo,
            cnpj:cnpj,
            codigo:codigo,
            data_recadastro:data_recadastro,
            id:id,
            nome:nome,
            vendedor:vendedor
        }

            let aux = await  this.repository.findByParam(param);
             return aux 
    }

@Mutation(()=> Cliente)
async createCliente( @Arg('dados') dados:CreateClienteInput){
    if(!dados.data_cadastro){
     dados.data_cadastro = this.dateService.obterDataAtual();
    }
    dados.data_recadastro = this.dateService.obterDataHoraAtual();
    if( !dados.ativo ) dados.ativo = "S";

    let resultInsertCliente = await this.repository.insert(dados)
    let clientCreated:Cliente[] = []; 
    if ( resultInsertCliente.insertId >  0 ){
            clientCreated = await this.repository.findByCode(resultInsertCliente.insertId )
     }

     if( clientCreated?.length > 0 ){
        return clientCreated[0]
     }

    }

@Mutation(()=> Cliente)
async updateCliente(@Arg('dados') dados:UpdateClienteInput){
    
    let verifiClient = await this.repository.findByCode(dados.codigo)
    dados.data_recadastro = this.dateService.obterDataHoraAtual();

    let resultUpdateCliente;
        if( verifiClient.length > 0 ){
            resultUpdateCliente = await this.repository.update(dados);
        }
    let arrClienteUpdated:Cliente[];  

        if( resultUpdateCliente && resultUpdateCliente?.serverStatus > 0 ){
            arrClienteUpdated = await this.repository.findByCode(dados.codigo)
            return arrClienteUpdated[0]
        }
}

}