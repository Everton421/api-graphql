import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Produto } from "../dtos/models/produto-model";
import { ProdutoRepository } from "../repository/produto/Produto-Repository";
import { ProdutoArgs } from "../dtos/args/produto-args"; 
import { CreateProdutoInput } from "../dtos/inputs/create-produto-input";
import { IProduto } from "../repository/produto/IProduto";
import { GraphQLError } from "graphql";


@Resolver(()=>Produto)
export class ProdutoResolver{

    repository = new ProdutoRepository();

    @Query(()=>[Produto])
        async produtos(   @Args(){ codigo ,descricao, grupo, marca, ativo, num_fabricante, num_original, origem, sku } :ProdutoArgs  ){
            let param: Partial<ProdutoArgs> = 
             {
                    codigo:codigo,
                    descricao: descricao,
                    marca: marca,
                    grupo : grupo,
                    ativo: ativo,
                    num_fabricante:num_fabricante,
                    num_original:num_original,
                    origem:origem,
                    sku:sku   
                }

            let aux = await this.repository.finByParam(param); 
            return aux
        }

    @Mutation(()=>Produto)
        async cadastrarProduto(@Arg('dados') dados: CreateProdutoInput) {
            let validProd:IProduto[]=[];
            if(Number(dados.codigo) > 0 ){
                  validProd = await this.repository.findByCode(dados.codigo);
                }
            if(validProd.length > 0 ){
                throw new GraphQLError(`O produto ja foi Cadastrado ${dados.codigo}`)
            }else{
               let result:any =  await this.repository.create(dados)
               dados.codigo = result.insertId
                return dados
            }
        }

    }