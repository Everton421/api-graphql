import { rejects } from "assert";
import { resolve } from "path";
import { ICLiente } from "./ICliente";
import { conn } from "../../database/dataBaseConfig";
import { ClienteArgs } from "../../dtos/args/cliente-args";



export class ClienteRepository{
    dbName = `\`${57473685000100}\``;

   
    async findAll() : Promise<ICLiente[]>{
        return new Promise((resolve,reject )=>{
            const sql = ` SELECT * FROM ${this.dbName}.clientes`;

                conn.query(sql, (err, result:ICLiente[] )=>{
                    if(err){
                        console.log("Erro ao consultar clientes ", err)
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
        })
    }

    async findByParam( param: Partial<ClienteArgs> ) :Promise<ICLiente[]>{
        return new Promise((resolve, reject)=>{

            const sql = `
            SELECT *,
            DATE_FORMAT( data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%i:%s') as data_recadastro
            FROM ${ this.dbName }.clientes 
            ` 

            let conditions = [];
            let valueParamSql = [];
            
            if(param.codigo){
                conditions.push(" codigo = ? ")
                valueParamSql.push(param.codigo);
            }
            if(param.nome){
                conditions.push(" nome like = ? ")
                valueParamSql.push(`%${param.nome}$`);
            }
            if(param.ativo){
                conditions.push(" ativo = ? ")
                valueParamSql.push(param.ativo);
            }
            if(param.cnpj){
                conditions.push(" cnpj = ? ")
                valueParamSql.push(param.cnpj)
            }
            if(param.vendedor){
                conditions.push(" vendedor = ? ")
                valueParamSql.push(param.vendedor)
            }
            if(param.data_recadastro){
                conditions.push(" data_recadastro > ? ")
                valueParamSql.push(param.data_recadastro);
            }

              let whereClause = "";

              if( valueParamSql.length > 0 ){
                    whereClause = ' WHERE '+ conditions.join(" AND ")
              }

                let finalSql = sql + whereClause

                    conn.query(finalSql, valueParamSql, (err, result:ICLiente[] )=>{
                        if( err ){
                            console.log("erro ao consultar os clientes ", err );
                            reject(err)
                        }else{
                            resolve(result)
                        }

                        })

        })
    }


}

