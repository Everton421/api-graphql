import { conn } from "../../database/dataBaseConfig";
import { CategoriaArgs } from "../../dtos/args/categoria-args";
import { Categoria } from "../../dtos/models/categoria/categoria-model";

export class CategoriaRepository{
 
    dbName = `\`${57473685000100}\``;

        async findByParam(param: Partial<CategoriaArgs>): Promise<any[]> {
            return new Promise((resolve, reject) => {
    
                const sql = `
                SELECT *,
                DATE_FORMAT( data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%i:%s') as data_recadastro
                FROM ${this.dbName}.categorias `
    
                let conditions = [];
                let valueParamSql = [];
    
                if (param.codigo) {
                    conditions.push(" codigo = ? ")
                    valueParamSql.push(param.codigo);
                }

                  if (param.id) {
                    conditions.push(" id = ? ")
                    valueParamSql.push(param.id);
                }

                if (param.descricao) {
                    conditions.push(" descricao like  ? ")
                    valueParamSql.push(`%${param.descricao}%`);
                }
                if (param.ativo) {
                    conditions.push(" ativo = ? ")
                    valueParamSql.push(param.ativo);
                }
           
             
                if (param.data_recadastro) {
                    conditions.push(" data_recadastro > ? ")
                    valueParamSql.push(param.data_recadastro);
                }
    
                let whereClause = "";
    
                if (valueParamSql.length > 0) {
                    whereClause = " WHERE " + conditions.join(" AND ")
                }
    
                let finalSql = sql + whereClause
    
                conn.query(finalSql, valueParamSql, (err:any, result:  any[]) => {
                    if (err) {
                        console.log("erro ao consultar as categorias ", err);
                        reject(err)
                    } else {
                        resolve(result)
                    }
    
                })
    
            })
        }
     async findByCode(code: number): Promise<Categoria[]> {
            return new Promise((resolve, reject) => {
                const sql = `
                SELECT *,
                DATE_FORMAT( data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%i:%s') as data_recadastro
                FROM ${this.dbName}.categorias WHERE codigo = ? 
                `
                conn.query(sql, code, (err, result: Categoria[] | any) => {
                    if (err) {
                        console.log("erro ao consultar as categorias ", err);
                        reject(err)
                    } else {
                        resolve(result)
                    }
    
                })
            })
    
        }

}