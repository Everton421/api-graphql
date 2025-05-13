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

     
    @Mutation(()=> Servico, { name:"CreateServico"})
    async cadastrarServico( @Arg('dados') dados: CreateServicoInput ) :Promise<Servico> {
            let resultInsertService =   await this.repository.insert(dados)
          
             let dadosService: Servico  =
              {

                    aplicacao:dados.aplicacao,
                    ativo: dados.ativo,
                    data_cadastro: dados.data_cadastro,
                    data_recadastro: dados.data_recadastro,
                    id: dados.id,
                    tipo_serv:dados.tipo_serv,
                    valor: dados.valor,
                    codigo:resultInsertService.insertId
                }
             return dadosService;
    }

      @Mutation(()=> Servico, { name: "UpdateServico"})
 

}
