import { ResultSetHeader } from "mysql2";
import { conn } from "../../database/dataBaseConfig";
import { MarcasArgs } from "../../dtos/args/marca-args";
import { CreateMarcasInput } from "../../dtos/inputs/marca/create-marcas";
import { UpdateMarcasInput } from "../../dtos/inputs/marca/update-marcas";

export class MarcasRepository{
 
    dbName = `\`${57473685000100}\``;

        async findByParam(param: Partial<MarcasArgs>): Promise<any[]> {
            return new Promise((resolve, reject) => {
    
                const sql = `
                SELECT *,
                DATE_FORMAT( data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%i:%s') as data_recadastro
                FROM ${this.dbName}.marcas `
    
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
                        console.log("erro ao consultar as marcas ", err);
                        reject(err)
                    } else {
                        resolve(result)
                    }
    
                })
    
            })
        }
      async findByCode(code: number): Promise<MarcasArgs[]> {
            return new Promise((resolve, reject) => {
                const sql = `
                SELECT *,
                DATE_FORMAT( data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%i:%s') as data_recadastro
                FROM ${this.dbName}.marcas WHERE codigo = ? 
                `
                conn.query(sql, code, (err, result: MarcasArgs[] | any) => {
                    if (err) {
                        console.log("erro ao consultar as marcas ", err);
                        reject(err)
                    } else {
                        resolve(result)
                    }
    
                })
            })
    
        }


           async create(categoria : CreateMarcasInput): Promise<ResultSetHeader> {
                return new Promise((resolve, reject) => {

                    let sql =
                        `  
                 INSERT INTO 
                 ${this.dbName}.marcas
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
        
            async update(categoria: UpdateMarcasInput ):Promise<ResultSetHeader>{
        
                return new Promise((resolve, reject ) =>{
                    let sql = `UPDATE ${this.dbName}.marcas SET 
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
                                console.log("marca  alterada com sucesso")
                                resolve(result)
                            }
                        })
        
                })  
            }
}