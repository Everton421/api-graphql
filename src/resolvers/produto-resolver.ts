import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Produto } from "../dtos/models/produtos/produto-model";
import { ProdutoRepository } from "../repository/produto/Produto-Repository";
import { ProdutoArgs } from "../dtos/args/produto-args"; 
import { CreateProdutoInput } from "../dtos/inputs/produto/create-produto-input";
import { IProduto } from "../repository/produto/IProduto";
import { GraphQLError } from "graphql";
import { UpdateProdutoInput } from "../dtos/inputs/produto/update-produto-input";
import { DateService } from "../service/date-service";
import { TokenService } from "../service/token-service";


@Resolver(()=>Produto)
export class ProdutoResolver{
    dateService = new DateService(); 
    repository = new ProdutoRepository();
    tokenService = new TokenService();

    @Query(()=>[Produto], { name: "produtos"})
        async produtos(   @Args(){ codigo ,descricao, grupo, marca, ativo, num_fabricante, num_original, origem, sku } :ProdutoArgs , @Ctx() context:any ){
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

                      if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

          let aux = await this.repository.finByParam(param, db); 
           return aux

        }

  @Query(()=>Produto, { name:"produto"})   
        async findproduto(@Args(){codigo,ativo,descricao,grupo,marca,num_fabricante,num_original,origem,sku } :  ProdutoArgs, @Ctx() context:any ){
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

                    if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

            let aux:Produto[] = await this.repository.finByParam(param, db); 
            let resultado:Produto = aux[0];
            return  resultado

        }


    @Mutation(()=>Produto )
        async createProduto(@Arg('dados') dados: CreateProdutoInput, @Ctx() context:any) {
            
                if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

                     if( !dados.num_fabricante )  dados.num_fabricante = '';
                     if( !dados.num_original )  dados.num_original = '';
                     if( !dados.observacoes1 ) dados.observacoes1 = ''; 
                     if( !dados.observacoes2 ) dados.observacoes2 = '';
                     if( !dados.observacoes3 ) dados.observacoes3 = ''; 
                     if( !dados.cst ) dados.cst = '00';
                     if( !dados.class_fiscal ) dados.class_fiscal = '0000.00.00'; 
                     if( !dados.sku ) dados.sku = ''; 
                     if( !dados.grupo ) dados.grupo = 0; 
                     if( !dados.marca ) dados.marca = 0; 
                     if( !dados.tipo ) dados.tipo = 0; 
                     if( !dados.origem ) dados.origem = '0'; 
                     if( !dados.estoque ) dados.estoque =  0;
                     if( !dados.id ) dados.id =  0;
                     if( !dados.ativo ) dados.ativo =  'S';
                     

                 dados.data_recadastro = this.dateService.obterDataHoraAtual();
              
                if(!dados.data_cadastro) dados.data_cadastro = this.dateService.obterDataAtual();
               
              let result:any =  await this.repository.create(dados, db)
               dados.codigo = result.insertId
                return dados
        }

        @Mutation(()=> Produto )
        async updateProduto(@Arg('dados') dados: UpdateProdutoInput, @Ctx() context:any){

         if( !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

            let validProd:IProduto[]=[];
            dados.data_recadastro = this.dateService.obterDataHoraAtual();

                  validProd = await this.repository.findByCode(dados.codigo, db);
                  
            if(validProd.length > 0 ){
                //throw new GraphQLError(`O produto ja foi Cadastrado ${dados.codigo}`)
               let result =  await this.repository.update(dados , db)
               if(result.serverStatus > 0 ){
                  let resultUpdateProd = await this.repository.findByCode(dados.codigo , db);
                    return resultUpdateProd[0];
               }
            }
        }

    }