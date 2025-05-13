import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Produto } from "../dtos/models/produtos/produto-model";
import { ProdutoRepository } from "../repository/produto/Produto-Repository";
import { ProdutoArgs } from "../dtos/args/produto-args"; 
import { CreateProdutoInput } from "../dtos/inputs/produto/create-produto-input";
import { IProduto } from "../repository/produto/IProduto";
import { GraphQLError } from "graphql";
import { UpdateProdutoInput } from "../dtos/inputs/produto/update-produto-input";
import { DateService } from "../service/date-service";


@Resolver(()=>Produto)
export class ProdutoResolver{
    dateService = new DateService(); 
    repository = new ProdutoRepository();

    @Query(()=>[Produto], { name: "produtos"})
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

    @Mutation(()=>Produto )
        async createProduto(@Arg('dados') dados: CreateProdutoInput) {
            
              dados.data_recadastro = this.dateService.obterDataHoraAtual();
              dados.data_cadastro = this.dateService.obterDataAtual();
               let result:any =  await this.repository.create(dados)
               dados.codigo = result.insertId
                return dados
        }

        @Mutation(()=> Produto )
        async updateProduto(@Arg('dados') dados: UpdateProdutoInput){
            let validProd:IProduto[]=[];
            dados.data_recadastro = this.dateService.obterDataHoraAtual();

                  validProd = await this.repository.findByCode(dados.codigo);
                  
            if(validProd.length > 0 ){
                //throw new GraphQLError(`O produto ja foi Cadastrado ${dados.codigo}`)
               let result =  await this.repository.update(dados)
               if(result.serverStatus > 0 ){
                  let resultUpdateProd = await this.repository.findByCode(dados.codigo);
                    return resultUpdateProd[0];
               }
            }
        }

    }