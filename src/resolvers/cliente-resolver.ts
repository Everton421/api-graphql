import { Args, Query, Resolver } from "type-graphql";
import { Cliente } from "../dtos/models/clientes/cliente-model"; 
import { ClienteArgs } from "../dtos/args/cliente-args";
import { ClienteRepository } from "../repository/cliente/cliente-repository";


@Resolver (()=> Cliente)
export class ClienteResolver{
 
    repository = new ClienteRepository();

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


}