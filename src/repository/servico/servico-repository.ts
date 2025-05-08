import { FieldPacket, QueryError } from "mysql2";
import { conn } from "../../database/dataBaseConfig";
import { ServicoArgs } from "../../dtos/args/servico-args";
import { Servico } from "../../dtos/models/servicos/servico-model";




export class ServicoRepository{

    dbName = `\`${57473685000100}\``;


    async findAll():Promise <Servico[]> {
        return new Promise((resolve, reject )=>{

            const sql = `
            select 
            *,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT ( data_recadastro, '%Y-%m-%d %H:%m:%s') AS data_recadastro    
            from 
            ${this.dbName}.servicos
            `
            conn.query(sql, ( err, result:Servico[] )=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

    async findByCode( codigo:number ):Promise<Servico[]> {
        return new Promise((resolve, reject )=>{

            const sql = `
            select 
            *,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT ( data_recadastro, '%Y-%m-%d %H:%m:%s') AS data_recadastro    
            from 
            ${this.dbName}.servicos where codigo = ? 
            `
            conn.query(sql, codigo, ( err, result:any )=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

    async findByParam( param:Partial<ServicoArgs> ): Promise <Servico[]> {
        return new Promise((resolve,reject ) =>{

            const sql = 
            `
            SELECT *, 
            DATE_FORMAT( data_cadastro, '%Y-%m-%d %H-%m-%s') as data_cadastro,
            DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%m:%s') as data_recadastro  
            FROM ${ this.dbName }.servicos 
            `

            let conditions = [];
            let valueParamSql = [];

            if( param.codigo){
                conditions.push( " codigo = ? ")
                valueParamSql.push(param.codigo)
            }

            if( param.aplicacao ){
                conditions.push( " aplicacao like ? ");
                valueParamSql.push( `%${param.aplicacao}%`);
            }
            if(param.ativo){
                conditions.push(" ativo = ? ");
                valueParamSql.push(param.ativo);    
            }
            if(param.data_recadastro){
                conditions.push(" data_recadastro > ? ")
                valueParamSql.push(param.data_recadastro)
            }

            let whereClause = "";
            if( valueParamSql.length > 0 ){
                whereClause = ' WHERE '+conditions.join(" AND ")
            }

            let finalSql = sql + whereClause

                conn.query(finalSql, valueParamSql, ( err  ,result:any  )=>{
                    if(err){
                        console.log("Erro ao tentar consultar os Serviços")
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })

        })
    }


    async create(servico:Servico){

        return new Promise( (resolve,reject ) =>{
            let {
            aplicacao,
            ativo,
            codigo,
            data_cadastro,
            data_recadastro,
            id,
            tipo_serv,
            valor,
            } = servico
        })
    }

} 