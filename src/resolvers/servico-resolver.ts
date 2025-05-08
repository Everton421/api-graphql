import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Servico } from "../dtos/models/servicos/servico-model";
import { resolveReadonlyArrayThunk } from "graphql";
import { ServicoRepository } from "../repository/servico/servico-repository";
import { ServicoArgs } from "../dtos/args/servico-args";
import { CreateServicoInput } from "../dtos/inputs/create-servico-input";


@Resolver(()=>Servico)




export class ServicoResolver{
    
    servico = new Servico() 
        repository = new ServicoRepository();

    @Query( ()=>[Servico])
    async servicos( @Args(){ aplicacao, ativo, codigo, data_recadastro}:ServicoArgs ){
            let param:ServicoArgs = { 
                aplicacao: aplicacao,
                ativo:ativo,
                codigo:codigo,
                 data_recadastro:data_recadastro
            }    
        let aux = await this.repository.findByParam(param);
        return aux;
    }

    @Mutation(()=> Servico, { name:"servico"})
    async cadastrarServico( @Arg('dados') dados: CreateServicoInput ) :Promise<Servico> {
        return ;
    }

}
