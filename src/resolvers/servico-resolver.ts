import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Servico } from "../dtos/models/servicos/servico-model";
import { GraphQLError, resolveReadonlyArrayThunk } from "graphql";
import { ServicoRepository } from "../repository/servico/servico-repository";
import { ServicoArgs } from "../dtos/args/servico-args";
import { CreateServicoInput } from "../dtos/inputs/servico/create-servico-input";
import { UpdateServicoInput } from "../dtos/inputs/servico/update-servico-input";
import { DateService } from "../service/date-service";
import { TokenService } from "../service/token-service";
 
@Resolver(()=>Servico)




export class ServicoResolver{
    
    servico = new Servico() 
        repository = new ServicoRepository();
        dateService = new DateService();
        tokenService = new TokenService();

    @Query( ()=>[Servico], { name:"servicos"})
    async servicos( @Args(){ aplicacao, ativo, codigo, data_recadastro}:ServicoArgs, @Ctx() context:any){
            
             if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``
        
        
        let param:ServicoArgs = { 
                aplicacao: aplicacao,
                ativo:ativo,
                codigo:codigo,
                 data_recadastro:data_recadastro
            }    
        let aux = await this.repository.findByParam(param, db );
        return aux;
    }
   
    @Query( ()=> Servico, { name: "servico"})
    async findServico(@Args(){ aplicacao,ativo,codigo,data_recadastro }:ServicoArgs, @Ctx() context:any ){

                 if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

            let param:ServicoArgs = { 
                aplicacao: aplicacao,
                ativo:ativo,
                codigo:codigo,
                 data_recadastro:data_recadastro
            }    
        let arrResult = await this.repository.findByParam(param, db);
        let resultService = arrResult[0] 
        return  resultService;
        
    }

     
    @Mutation(()=> Servico, { name:"CreateServico"})
    async cadastrarServico( @Arg('dados') dados: CreateServicoInput, @Ctx() context:any )  {


             if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``


            if( !dados.data_cadastro ) dados.data_cadastro = this.dateService.obterDataAtual();
            if(!dados.id ) dados.id = 0;
            if(!dados.ativo ) dados.ativo = 'S';
             dados.data_recadastro = this.dateService.obterDataHoraAtual();
             let resultInsertService =   await this.repository.insert(dados, db)
          
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
       async updateServico( @Arg('dados') dados: UpdateServicoInput, @Ctx() context:any ) {

              if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

        let verifiService = await this.repository.findByCode(dados.codigo, db)
      
        if(!dados.id ) dados.id = 0;
         dados.data_recadastro = this.dateService.obterDataHoraAtual();

            if( verifiService.length <= 0 ) { 
                throw new GraphQLError(   'Erro', { extensions:{ code:" CUSTOM_ERROR ", message: "Servico nao encontrado" } }  )
            }    
            let resultUpdateService = await this.repository.update(dados, db)
           
              if(resultUpdateService.serverStatus > 0 ){
                     let serviceResult:Servico[] = await this.repository.findByCode(dados.codigo, db)
                 return serviceResult[0];
            } 
       }

}
