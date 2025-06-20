import { ResultSetHeader } from "mysql2";
import { conn } from "../../database/dataBaseConfig";
import { FormaPagamentoArgs } from "../../dtos/args/forma_pagamento-args";
import { FormaPagamento } from "../../dtos/models/forma_pagamento/forma_pagamento-model";
import { CreateFormaPagamentoInput } from "../../dtos/inputs/forma_pagamento/create-fpgt-input";
import { UpdateFormaPagamentoInput } from "../../dtos/inputs/forma_pagamento/update-fpgt-input";

export class formaPagamentoRepository{
 

        async findByParam(param: Partial<FormaPagamentoArgs>, dbname:string): Promise<any[]> {
            return new Promise((resolve, reject) => {
    
                const sql = `
                SELECT *,
                DATE_FORMAT( data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%i:%s') as data_recadastro
                FROM ${dbname}.forma_pagamento `
    
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
                  if (param.ativo) {
                    conditions.push(" parcelas = ? ")
                    valueParamSql.push(param.parcelas);
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
                        console.log("erro ao consultar as formas de forma de pagamento ", err);
                        reject(err)
                    } else {
                        resolve(result)
                    }
    
                })
    
            })
        }
      async findByCode(code: number, dbname:string ): Promise<FormaPagamento[]> {
            return new Promise((resolve, reject) => {
                const sql = `
                SELECT *,
                DATE_FORMAT( data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%i:%s') as data_recadastro
                FROM ${dbname}.forma_pagamento WHERE codigo = ? 
                `
                conn.query(sql, code, (err, result: FormaPagamento[] | any) => {
                    if (err) {
                        console.log("erro ao consultar as forma_pagamento ", err);
                        reject(err)
                    } else {
                        resolve(result)
                    }
    
                })
            })
    
        }


           async create(fpgt : CreateFormaPagamentoInput, dbname:string ): Promise<ResultSetHeader> {
                return new Promise((resolve, reject) => {

                    let sql =
                        `  
                 INSERT INTO 
                 ${dbname}.forma_pagamento
                      (   
                        id,
                        descricao,
                        desc_maximo,
                        parcelas,
                        intervalo,
                        recebimento,
                        data_cadastro ,
                        data_recadastro ,
                        ativo 
                       ) values
                        (
                          ?, ?, ?, ?, ?, ?, ?, ?, ?  );
                    `
                    const dados = [ fpgt.id, fpgt.descricao,  fpgt.desc_maximo, fpgt.parcelas, fpgt.intervalo, fpgt.recebimento, fpgt.data_cadastro, fpgt.data_recadastro,fpgt.ativo ]
        
                    conn.query(sql, dados, (err: any, result: ResultSetHeader | any) => {
                        if (err) reject(err);
                        resolve(result)
                    })
                })
            }
        
            async update(fpgt: UpdateFormaPagamentoInput, dbname:string  ):Promise<ResultSetHeader>{
        
                return new Promise((resolve, reject ) =>{
                    let sql = `UPDATE ${dbname}.forma_pagamento SET 
                    ` 
        
                    let conditions=[];
                    let values =[];
        


                     if( fpgt.id){
                        conditions.push(" id = ? ")
                        values.push(fpgt.id)
                     }
                    
                      if( fpgt.descricao){
                        conditions.push(" descricao = ? ")
                        values.push(fpgt.descricao)
                    }
                   
                     if( fpgt.desc_maximo){
                        conditions.push(" desc_maximo = ? ")
                        values.push(fpgt.desc_maximo)
                    }
                    if( fpgt.desc_maximo){
                        conditions.push(" desc_maximo = ? ")
                        values.push(fpgt.desc_maximo)
                    }
                    
                    if( fpgt.parcelas){
                        conditions.push(" parcelas = ? ")
                        values.push(fpgt.parcelas)
                    }

                    if( fpgt.intervalo){
                        conditions.push(" intervalo = ? ")
                        values.push(fpgt.intervalo)
                    }
                    
                    if( fpgt.recebimento){
                        conditions.push(" recebimento = ? ")
                        values.push(fpgt.recebimento)
                    }

                    if(fpgt.data_cadastro){
                        conditions.push(" data_cadastro")
                        values.push(fpgt.data_cadastro)
                    }   
                    if( fpgt.data_recadastro){
                        conditions.push(" data_recadastro = ? ")
                        values.push(fpgt.data_recadastro)
                    }
                  if( fpgt.ativo){
                        conditions.push(" ativo = ? ")
                        values.push(fpgt.ativo);
                    }
                   
                     
                        
                    conditions.join(' , ')
                    
                    values.push(fpgt.codigo)
                    let finalSql =  sql + conditions + " WHERE codigo = ? "
        
        
                        conn.query(finalSql, values , (err, result: ResultSetHeader  )=>{
                            if(err){
                                reject(err)
                            }else{
                                console.log("forma de pagamento  alterada com sucesso")
                                resolve(result)
                            }
                        })
        
                })  
            }
}