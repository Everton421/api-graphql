import { Field, Float, Int, ObjectType } from "type-graphql";
import { ClientePedido } from "../cliente/clientePedido-model";
import { ProdutoPedido } from "../produtos-pedido/produto-pedido-model";
import { ServicoPedido } from "../servicos-pedido/servico-pedido-model";
 

@ObjectType()
export class Pedido{
    @Field(()=> Int)
    codigo:number
    
    @Field(()=> ClientePedido)
    cliente:ClientePedido
    
    @Field(()=> [ProdutoPedido], {nullable:true})
    produtos: ProdutoPedido[]
    @Field(()=>[ ServicoPedido], { nullable: true })
    servicos : ServicoPedido[]

    @Field(()=> Int,{nullable:true})
    id:number
    
    @Field(()=> Int)
    vendedor:number

    @Field({nullable:true})
    situacao:string
    
    @Field({nullable:true}) 
    contato:string

    @Field(()=> Float,{nullable:true}) 
    descontos:number

    @Field(()=> Int,{nullable:true}) 
    forma_pagamento:number
    
    @Field({nullable:true}) 
    observacoes:string

    @Field(()=> Int,{nullable:true}) 
    quantidade_parcelas:number

    @Field(()=> Float) 
    total_geral:number

    @Field(()=> Float) 
    total_produtos:number

    @Field(()=> Float) 
    total_servicos:number
 
    @Field(()=> Int,{nullable:true}) 
    veiculo:number

    @Field() 
    data_cadastro:string

    @Field() 
    data_recadastro:string
    
    @Field(()=> Int,{nullable:true}) 
    tipo_os:number

    @Field({nullable:true}) 
    enviado:string

    @Field(()=> Int,{nullable:true})
    tipo:number

}