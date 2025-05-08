import { Field, InputType, Int } from "type-graphql";
import { ProdutoArgs } from "../args/produto-args";
import { ServicoArgs } from "../args/servico-args";


@InputType( { description: " Dados para creação de um Serviço"})
export class CreateServicoInput   {
    @Field(()=>Int) 
     codigo: number;

     @Field()
     ativo: string;

     @Field()
    aplicacao: string;
    
    @Field()
    data_recadastro: string;

    }   