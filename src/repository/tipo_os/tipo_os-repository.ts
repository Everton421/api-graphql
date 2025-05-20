import { ResultSetHeader } from "mysql2";
import { conn } from "../../database/dataBaseConfig";
import { TiposOsArgs } from "../../dtos/args/tipos_os-args";
import { CreateTiposOsInput } from "../../dtos/inputs/tipos_os/create-tipos_os-input";
import { UpdateTiposOsInput } from "../../dtos/inputs/tipos_os/update-tipos_os-input";

export class TipoOsRepository{
 
    dbName = `\`${57473685000100}\``;

        async findByParam(param: Partial<TiposOsArgs>): Promise<any[]> {
            return new Promise((resolve, reject) => {
    
                const sql = `
                SELECT *,
                DATE_FORMAT( data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%i:%s') as data_recadastro
                FROM ${this.dbName}.tipos_os `
    
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
                        console.log("erro ao consultar os tipos_os ", err);
                        reject(err)
                    } else {
                        resolve(result)
                    }
    
                })
    
            })
        }
      async findByCode(code: number): Promise<TiposOsArgs[]> {
            return new Promise((resolve, reject) => {
                const sql = `
                SELECT *,
                DATE_FORMAT( data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%i:%s') as data_recadastro
                FROM ${this.dbName}.tipos_os WHERE codigo = ? 
                `
                conn.query(sql, code, (err, result: TiposOsArgs[] | any) => {
                    if (err) {
                        console.log("erro ao consultar os tipos_os ", err);
                        reject(err)
                    } else {
                        resolve(result)
                    }
    
                })
            })
    
        }


           async create(categoria : CreateTiposOsInput): Promise<ResultSetHeader> {
                return new Promise((resolve, reject) => {

                    let sql =
                        `  
                 INSERT INTO 
                 ${this.dbName}.tipos_os
                      (   
                        id,
                        descricao,
                        data_cadastro ,
                        data_recadastro ,
                        ativo 
                       ) values
                        (
                          ?, ?, ?, ?, ?  );
                    `
                    const dados = [ categoria.id, categoria.descricao, categoria.data_cadastro, categoria.data_recadastro, categoria.ativo ]
        
                    conn.query(sql, dados, (err: any, result: ResultSetHeader | any) => {
                        if (err) reject(err);
                        resolve(result)
                    })
                })
            }
        
            async update(categoria: UpdateTiposOsInput ):Promise<ResultSetHeader>{
        
                return new Promise((resolve, reject ) =>{
                    let sql = `UPDATE ${this.dbName}.tipos_os SET 
                    ` 
        
                    let conditions=[];
                    let values =[];
        
                    if( categoria.ativo){
                        conditions.push(" ativo = ? ")
                        values.push(categoria.ativo);
                    }
                   
                    if(categoria.data_cadastro){
                        conditions.push(" data_cadastro")
                        values.push(categoria.data_cadastro)
                    }   
                    if( categoria.data_recadastro){
                        conditions.push(" data_recadastro = ? ")
                        values.push(categoria.data_recadastro)
                    }
                    if( categoria.descricao){
                        conditions.push(" descricao = ? ")
                        values.push(categoria.descricao)
                    }
                     
                        
                    conditions.join(' , ')
                    
                    values.push(categoria.codigo)
                    let finalSql =  sql + conditions + " WHERE codigo = ? "
        
        
                        conn.query(finalSql, values , (err, result: ResultSetHeader  )=>{
                            if(err){
                                reject(err)
                            }else{
                                console.log("tipo_os  alterada com sucesso")
                                resolve(result)
                            }
                        })
        
                })  
            }
}