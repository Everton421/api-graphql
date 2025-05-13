import { Field, Float, InputType, Int } from "type-graphql";
import { ProdutoArgs } from "../../args/produto-args";  
import { ServicoArgs } from "../../args/servico-args";  


@InputType( { description: " Dados para criação de um Serviço"})
export class CreateServicoInput   {
    @Field(()=>Int, { nullable:true }) 
     codigo: number;

     @Field(()=>Int, { nullable:true })
      id:number

     @Field({ nullable:true})
     ativo: string;

     @Field( ()=> Float)
     valor:number

     @Field()
    aplicacao: string;

    @Field(()=>Int, { nullable:true})
    tipo_serv:number

    @Field( { nullable:true})
    data_cadastro: string;
    
    @Field(  { nullable:true})
    data_recadastro: string;
    
    }   