import { QueryError    } from "mysql2";
import { conn } from "../../database/dataBaseConfig"
import { IProduto } from "./IProduto"
import { ProdutoArgs } from "../../dtos/args/produto-args";
import { Produto } from "../../dtos/models/produtos/produto-model";
import { UpdateProdutoInput } from "../../dtos/inputs/produto/update-produto-input";

interface param{
    codigo:number
    descricao:string
}
type ResultSetHeader = {
     fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: any,
    serverStatus: number,
    warningStatus: number,
    changedRows: number
}
export class ProdutoRepository{

       dbName = `\`${57473685000100}\``;


    async findAll():Promise <IProduto[]> {
        return new Promise(   (resolve, reject )  =>{
            const sql = `SELECT  
             *,
               CAST( observacoes1 as CHAR(10000) CHARACTER SET utf8) as observacoes1,
         CAST( observacoes2 as CHAR(10000) CHARACTER SET utf8) as observacoes2,
          CAST( observacoes3 as CHAR(10000) CHARACTER SET utf8) as observacoes3, 
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
        DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 

            FROM ${ this.dbName }.produtos;`  
              conn.query(sql, (err, result:IProduto[] )=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })

        })
    }
    async findByCode( codigo:number ):Promise <IProduto[]> {
        return new Promise(   (resolve, reject )  =>{
            const sql = `SELECT  
             *,
               CAST( observacoes1 as CHAR(10000) CHARACTER SET utf8) as observacoes1,
         CAST( observacoes2 as CHAR(10000) CHARACTER SET utf8) as observacoes2,
          CAST( observacoes3 as CHAR(10000) CHARACTER SET utf8) as observacoes3, 
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
             DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
            FROM ${ this.dbName }.produtos
            where codigo = ? 
            
            ;`  
              conn.query(sql, codigo, (err, result:IProduto[] )=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })

        })
    }

   async finByParam(param: Partial<ProdutoArgs>){
    return new Promise((resolve,reject )=>{

    const sql = `SELECT  
                  *,
                    CAST( observacoes1 as CHAR(10000) CHARACTER SET utf8) as observacoes1,
         CAST( observacoes2 as CHAR(10000) CHARACTER SET utf8) as observacoes2,
          CAST( observacoes3 as CHAR(10000) CHARACTER SET utf8) as observacoes3, 
        DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
        DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
         FROM ${ this.dbName }.produtos`  

          let conditions = [];
         let valueParamSql = [];

         if( param.codigo ){
                  conditions.push(" codigo = ?");   
                valueParamSql.push(param.codigo);
         }  

         if( param.descricao  ){
            conditions.push(" descricao like ? ")  
            valueParamSql.push(`%${param.descricao}%`)
         }  

         if(param.grupo){
            conditions.push("  grupo = ? ");
            valueParamSql.push(param.grupo);
         }

          if(param.marca){
            conditions.push(" marca = ? ")
            valueParamSql.push( param.marca);
         }

         if(param.num_fabricante){
            conditions.push(" num_fabricante = ?");
            valueParamSql.push(param.num_fabricante)
         }

         if( param.num_original ){
            conditions.push(" num_original = ? ")
            valueParamSql.push(param.num_original)
        }

        if(param.origem){
            conditions.push(" origem = ? ")
            valueParamSql.push(param.origem)
        }

          let whereClause = "";
          if( valueParamSql.length > 0 ){
              whereClause = ' WHERE '+ conditions.join(" AND ") 
          }


          
          let finalSql = sql + whereClause

         conn.query(finalSql, valueParamSql ,(err , result:IProduto[] )=>{
            if(err){
                console.log("Erro ao tentar consultar Produto", err)
                reject(err)
            }else{
                resolve(result)
            }
        })
    })

    }

    async create(produto:Produto):Promise<ResultSetHeader> {
        return new Promise(   ( resolve, reject)=>{
            let {
                ativo,
                class_fiscal,
                cst,
                data_cadastro,
                data_recadastro,
                descricao,
                estoque,
                grupo,
                marca,
                num_original,
                origem,
                preco,
                sku,
                tipo,
                num_fabricante,
                observacoes1,
                observacoes2,
                observacoes3   } = produto

                const sql =` INSERT INTO  ${this.dbName}.produtos  
                             (
                            estoque ,
                            preco ,
                            grupo ,
                            origem ,
                            descricao ,
                            num_fabricante ,
                            num_original ,
                            sku ,
                            marca ,
                            class_fiscal ,
                            data_cadastro ,
                            data_recadastro ,
                            tipo,
                            observacoes1,
                            observacoes2,
                            observacoes3
                                ) VALUES (
                                    ${estoque} ,
                                    ${preco} ,
                                    ${grupo} ,
                                    ${origem} ,
                                    '${descricao}',
                                    '${num_fabricante}' ,
                                    '${num_original}' ,
                                    '${sku}' ,
                                    ${marca} ,
                                    '${class_fiscal}',
                                    '${data_cadastro}',
                                    '${data_recadastro}',  
                                    ${tipo}, 
                                    '${observacoes1}',
                                    '${observacoes2}',
                                    '${observacoes3}'  
                                  )
                            `;

                              conn.query(sql,   (err:any, result:ResultSetHeader   )=>{
                                if(err){
                                     console.log(err)
                                     reject(err);
                                }else{
                                    console.log(`produto cadastrado com sucesso `)
                                     resolve(result);
                                }
                            })
                        })
        }

    async update(produto: UpdateProdutoInput): Promise<ResultSetHeader> {

        return new Promise((resolve, reject) => {

            let sql =
                ` UPDATE ${this.dbName}.produtos SET `

            let conditions = [];
            let valueParamSql = [];
            if (produto.descricao) {
                conditions.push(" descricao = ? ")
                valueParamSql.push(produto.descricao)
            }

            if (produto.preco) {
                conditions.push(" preco = ? ")
                valueParamSql.push(produto.preco);
            }
            if (produto.id) {
                conditions.push(" id = ? ")
                valueParamSql.push(produto.id);
            }
            if (produto.estoque) {
                conditions.push(" estoque = ? ")
                valueParamSql.push(produto.estoque);
            }

            if (produto.grupo) {
                conditions.push(" grupo = ? ");
                valueParamSql.push(produto.grupo);
            }
            if (produto.origem) {
                conditions.push(" origem = ? ");
                valueParamSql.push(String(produto.origem));
            }
            if (produto.num_fabricante) {
                conditions.push(" num_fabricante = ? ");
                valueParamSql.push(String(produto.num_fabricante));
            }

            if (produto.ativo) {
                conditions.push(" ativo = ? ");
                valueParamSql.push(String(produto.ativo));
            }
            if (produto.sku) {
                conditions.push(" sku = ? ");
                valueParamSql.push(String(produto.sku));
            }
            if (produto.marca) {
                conditions.push(" marca = ? ");
                valueParamSql.push(produto.marca);
            }

            if (produto.class_fiscal) {
                conditions.push(" class_fiscal = ?");
                valueParamSql.push(produto.class_fiscal);
            }
            if (produto.cst) {
                conditions.push(" cst = ?");
                valueParamSql.push(produto.cst);
            }

            if (produto.data_cadastro) {
                conditions.push(" data_cadastro = ? ");
                valueParamSql.push(String(produto.data_cadastro));
            }
            if (produto.data_recadastro) {
                conditions.push(" data_recadastro = ? ");
                valueParamSql.push(String(produto.data_recadastro));
            }

            if (produto.observacoes1) {
                conditions.push(" observacoes1 = ? ");
                valueParamSql.push(String(produto.observacoes1));
            }
            if (produto.observacoes2) {
                conditions.push(" observacoes2 = ? ");
                valueParamSql.push(String(produto.observacoes2));
            }
            if (produto.observacoes3) {
                conditions.push(" observacoes3 = ? ");
                valueParamSql.push(String(produto.observacoes3));
            }
            if (produto.tipo) {
                conditions.push(" tipo = ? ");
                valueParamSql.push(produto.tipo);
            }


            let whereClause = " WHERE codigo = ? "
            valueParamSql.push(produto.codigo);

            let finalSql = sql + conditions.join(" , ") + whereClause;

          
                         conn.query(finalSql, valueParamSql,  (err:any, result:ResultSetHeader | any   )=>{
                                                if(err){
                                                    console.log(err)
                                                    reject(err);
                                                }else{
                                                    console.log(`produto atualizado com sucesso `)
                                                    resolve(result);
                                                }
                                            })
                                     
        })

    }

}