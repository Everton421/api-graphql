import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { FormaPagamento } from "../dtos/models/forma_pagamento/forma_pagamento-model";
import { formaPagamentoRepository } from "../repository/forma_pagamento/fpgt-repository";
import { DateService } from "../service/date-service";
import { FormaPagamentoArgs } from "../dtos/args/forma_pagamento-args";
import { CreateFormaPagamentoInput } from "../dtos/inputs/forma_pagamento/create-fpgt-input";
import { UpdateFormaPagamentoInput } from "../dtos/inputs/forma_pagamento/update-fpgt-input";
import { GraphQLError } from "graphql";

@Resolver(() => FormaPagamento)


export class FormaPagamentoResolver {

    repository = new formaPagamentoRepository();
    dateService = new DateService();

    @Query(() => [FormaPagamento], { name: "formasPagamento"   })
    async formasPagamento(@Args() { ativo, codigo, data_cadastro, data_recadastro, desc_maximo, descricao, id, intervalo, parcelas, recebimento }: FormaPagamentoArgs) {

        let param: FormaPagamentoArgs = { ativo, codigo, data_cadastro, data_recadastro, desc_maximo, descricao, id, intervalo, parcelas, recebimento }

        let aux = await this.repository.findByParam(param);
        return aux;
    }

    @Query(() => FormaPagamento, { name: "formaPagamento", description:" Filtra somente uma forma de pagamento" })
    async findServico(@Args() { ativo, codigo, data_cadastro, data_recadastro, desc_maximo, descricao, id, intervalo, parcelas, recebimento }: FormaPagamentoArgs) {

        let param: FormaPagamentoArgs = { ativo, codigo, data_cadastro, data_recadastro, desc_maximo, descricao, id, intervalo, parcelas, recebimento }

        let arrResult = await this.repository.findByParam(param);
        let resultFpgt = arrResult[0]
        return resultFpgt;

    }


    @Mutation(() => FormaPagamento, { name: "CreateFormaPagamento" })
    async cadastrarServico(@Arg('dados') dados: CreateFormaPagamentoInput): Promise<FormaPagamento> {

        if (!dados.data_cadastro) dados.data_cadastro = this.dateService.obterDataAtual();
        if (!dados.id) dados.id = 0;
        if (!dados.ativo) dados.ativo = 'S';
        if (!dados.data_recadastro) dados.data_recadastro = this.dateService.obterDataHoraAtual();
        if(!dados.desc_maximo ) dados.desc_maximo = 0;
        if(!dados.recebimento ) dados.recebimento = 0;
        
        
        let resultInsertService = await this.repository.create(dados)

        let dadosFpgtCreated: FormaPagamento[] = []
        if (resultInsertService.insertId > 0) {
            dadosFpgtCreated = await this.repository.findByCode(resultInsertService.insertId)
        }

        return dadosFpgtCreated[0];
    }


    @Mutation(() => FormaPagamento, { name: "UpdateFormaPagamento" })
    async updateServico(@Arg('dados') dados: UpdateFormaPagamentoInput): Promise<FormaPagamento | any> {

        let verifiFgpt = await this.repository.findByCode(dados.codigo)

        if (!dados.id) dados.id = 0;
        dados.data_recadastro = this.dateService.obterDataHoraAtual();

        if (verifiFgpt.length <= 0) {
            throw new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Forma de pagamento nao encontrada" } })
        }
        let resultUpdateFpgt = await this.repository.update(dados)

        if (resultUpdateFpgt.serverStatus > 0) {
            let fpgtResult: FormaPagamento[] = await this.repository.findByCode(dados.codigo)
            return fpgtResult[0];
        }
    }

}
