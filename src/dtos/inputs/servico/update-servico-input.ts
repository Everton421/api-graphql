import { Field, Float, InputType, Int } from "type-graphql";


@InputType( { description: "Dados para atualizção de um serviço"})
export class UpdateServicoInput{
    @Field(()=>Int )
    codigo:number;

    @Field(()=>Int, { nullable:true})
    id:number;

    @Field(()=>Float, { nullable:true })
    valor:number;

    @Field(  { nullable:true})
    aplicacao:string;

    @Field(()=> Int, { nullable:true})
    tipo_serv:number

    @Field( {nullable:true})
    data_cadastro:string;

    @Field({nullable:true})
    data_recadastro:string
    
    @Field({ nullable:true})
    ativo:string
}