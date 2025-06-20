import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { FormaPagamento } from "../dtos/models/forma_pagamento/forma_pagamento-model";
import { formaPagamentoRepository } from "../repository/forma_pagamento/fpgt-repository";
import { DateService } from "../service/date-service";
import { FormaPagamentoArgs } from "../dtos/args/forma_pagamento-args";
import { CreateFormaPagamentoInput } from "../dtos/inputs/forma_pagamento/create-fpgt-input";
import { UpdateFormaPagamentoInput } from "../dtos/inputs/forma_pagamento/update-fpgt-input";
import { GraphQLError } from "graphql";
import { TokenService } from "../service/token-service";

@Resolver(() => FormaPagamento)


export class FormaPagamentoResolver {

    repository = new formaPagamentoRepository();
    dateService = new DateService();
    tokenService = new TokenService();

    @Query(() => [FormaPagamento], { name: "formasPagamento"   } )
    async formasPagamento(@Args() { ativo, codigo, data_cadastro, data_recadastro, desc_maximo, descricao, id, intervalo, parcelas, recebimento }: FormaPagamentoArgs ,@Ctx() context:any ) {

                  if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

        let param: FormaPagamentoArgs = { ativo, codigo, data_cadastro, data_recadastro, desc_maximo, descricao, id, intervalo, parcelas, recebimento }

        let aux = await this.repository.findByParam(param, db );
        return aux;
    }
    

    @Query(() => FormaPagamento, { name: "formaPagamento", description:" Filtra somente uma forma de pagamento" })
    async formaPagamento(@Args() { ativo, codigo, data_cadastro, data_recadastro, desc_maximo, descricao, id, intervalo, parcelas, recebimento }: FormaPagamentoArgs ,@Ctx() context:any) {

               if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

        let param: FormaPagamentoArgs = { ativo, codigo, data_cadastro, data_recadastro, desc_maximo, descricao, id, intervalo, parcelas, recebimento }

        let arrResult = await this.repository.findByParam(param, db);
        let resultFpgt = arrResult[0]
        return resultFpgt;

    }


    @Mutation(() => FormaPagamento, { name: "CreateFormaPagamento" })
    async cadastrarformaPagamento(@Arg('dados') dados: CreateFormaPagamentoInput, @Ctx() context:any )  {

            if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

        if (!dados.data_cadastro) dados.data_cadastro = this.dateService.obterDataAtual();
        if (!dados.id) dados.id = 0;
        if (!dados.ativo) dados.ativo = 'S';
        if (!dados.data_recadastro) dados.data_recadastro = this.dateService.obterDataHoraAtual();
        if(!dados.desc_maximo ) dados.desc_maximo = 0;
        if(!dados.recebimento ) dados.recebimento = 0;
       
        
        let resultInsertService = await this.repository.create(dados, db)

        let dadosFpgtCreated: FormaPagamento[] = []
        if (resultInsertService.insertId > 0) {
            dadosFpgtCreated = await this.repository.findByCode(resultInsertService.insertId, db)
        }

        return dadosFpgtCreated[0];
    }


    @Mutation(() => FormaPagamento, { name: "UpdateFormaPagamento" })
    async updateformaPagamento(@Arg('dados') dados: UpdateFormaPagamentoInput, @Ctx() context:any )  {
                  if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

        let verifiFgpt = await this.repository.findByCode(dados.codigo, db )

        if (!dados.id) dados.id = 0;
        dados.data_recadastro = this.dateService.obterDataHoraAtual();

        if (verifiFgpt.length <= 0) {
            throw new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Forma de pagamento nao encontrada" } })
        }
        let resultUpdateFpgt = await this.repository.update(dados, db)

        if (resultUpdateFpgt.serverStatus > 0) {
            let fpgtResult: FormaPagamento[] = await this.repository.findByCode(dados.codigo, db)
            return fpgtResult[0];
        }
    }

}
