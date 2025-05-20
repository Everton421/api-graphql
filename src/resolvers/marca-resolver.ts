import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Marca } from "../dtos/models/marca/marca-model";
import { DateService } from "../service/date-service";
import { MarcasArgs } from "../dtos/args/marca-args";
import { MarcasRepository } from "../repository/marca/marca-repository";
import { CreateMarcasInput } from "../dtos/inputs/marca/create-marcas";
import { UpdateMarcasInput } from "../dtos/inputs/marca/update-marcas";

@Resolver(() => Marca)


export class MarcaResolver {

    dateService = new DateService()
    repository = new MarcasRepository();

    @Query(() => [Marca], { description: "marcas" })
    async findMarcas(@Args() { ativo, codigo, data_cadastro, data_recadastro, descricao, id }: MarcasArgs) {
        let params = {
            ativo, codigo, data_cadastro, data_recadastro, descricao, id
        }
        let result = await this.repository.findByParam(params)
        return result
    }

    
    @Query(() => Marca, { description: "marca" })
    async findMarca(@Args() { ativo, codigo, data_cadastro, data_recadastro, descricao, id }: MarcasArgs) {
        let params = {
            ativo, codigo, data_cadastro, data_recadastro, descricao, id
        }
        let arrMarcas = await this.repository.findByParam(params)
        let resultMarca = arrMarcas[0]
        return resultMarca
    }


    @Mutation(() => Marca)
    async createMarca(@Arg('dados') dados: CreateMarcasInput) {
        if (!dados.data_recadastro) dados.data_recadastro = this.dateService.obterDataHoraAtual();
        if (!dados.data_cadastro) dados.data_cadastro = this.dateService.obterDataAtual();
        if (!dados.id) dados.id = 0;
        if (!dados.ativo) dados.ativo = 'S';

        let resultCreateMarca = await this.repository.create(dados);
        if (resultCreateMarca.insertId > 0) {
            let marcaCreated = await this.repository.findByCode(resultCreateMarca.insertId)
            return marcaCreated[0];
        }
    }

    @Mutation(() => Marca)
    async updateMarca(@Arg('dados') dados: UpdateMarcasInput) {
        dados.data_recadastro = this.dateService.obterDataHoraAtual();
        let validMarca: Marca[] = []
        validMarca = await this.repository.findByCode(dados.codigo);

        if (validMarca.length > 0) {
            let validUpdatedmarca = await this.repository.update(dados);
            if (validUpdatedmarca.serverStatus > 0) {
                let resultMarcaUpdated = await this.repository.findByCode(dados.codigo)
                return resultMarcaUpdated[0];
            }
        }

    }


}