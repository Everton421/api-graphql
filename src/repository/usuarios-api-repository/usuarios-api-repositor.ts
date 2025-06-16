import { conn } from "../../database/dataBaseConfig";
import { UsuarioApi } from "./IUsuarioApi";


type ResultSetHeader = {
     fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: any,
    serverStatus: number,
    warningStatus: number,
    changedRows: number
}

export class UsuariosApiRepository{

    db_api = 'db_api'

            async insertUser(usuario:UsuarioApi){
                return new Promise(    (resolve, reject)=>{
                    let sql = `
                        INSERT INTO ${this.db_api}.usuarios
                        (
                            nome, email, cnpj, senha, responsavel, telefone
                        ) values( ?, ?, ?, ? , ?, ? )
                    `;
                      conn.query(sql, [usuario.nome, usuario.email, usuario.cnpj, usuario.senha, usuario.responsavel, usuario.telefone],(err:any, result:ResultSetHeader | any )=>{ 
                        if(err) reject(err);
                        else resolve(result);
                    })

                })
        }


        async findByName(nome:string):Promise< UsuarioApi[] > {
            return new Promise(    (resolve, reject)=>{
                let sql = `
                    select * from ${this.db_api}.usuarios where nome = ?
                `;

                  conn.query(sql, [ nome ],(err:any, result:any )=>{ 
                    if(err) reject(err);
                    else 
                        resolve(result);
                })

            })
    }

    async findByEmail(email:string):Promise< UsuarioApi[] > {
        return new Promise< UsuarioApi[]>(    (resolve, reject)=>{

            let sql = `
                select * from ${this.db_api}.usuarios where email ='${email}'
            `;

              conn.query(sql,  (err:any, result:any )=>{ 
                if(err){
                    console.log(err); 
                    reject(err);
                }else{ 
                    resolve(result);
                }
             })

        })
    }
 
    async findByEmailAndValidatorCode(email:string, codigoRecuperador:any) :Promise< UsuarioApi[] > {
        return new Promise< UsuarioApi[]>(    (resolve, reject)=>{
            let sql = `
                select * from ${this.db_api}.usuarios where email = ? and cod_recuperador = ? 
            `;

              conn.query(sql, [ email, codigoRecuperador  ],(err:any, result:any )=>{ 
                if(err) reject(err);
                else 
                    resolve(result);
            })

        })
    }

    async findByEmailPassword(email:string, senha:any):Promise< UsuarioApi[] > { 
        return new Promise< UsuarioApi[]>(    (resolve, reject)=>{
            let sql = `
                select * from ${this.db_api}.usuarios where email = ? and senha = ? 
            `;

              conn.query(sql, [ email, senha  ],(err:any, result:any )=>{ 
                if(err) reject(err);
                else 
                    resolve(result);
            })

        })
    }



      async updateByParam( user: UsuarioApi){
            return new Promise(( resolve, reject)=>{

            if( !user.codigo){
                console.log("não é possivel atualizar o usuario da api sem informar o codigo!")
            return;
            }

                let sql = ` update ${this.db_api}.usuario set`
                
                let conditions =[]
                let values =[]

                if( user.cnpj){
                    conditions.push(' cnpj   ? ');
                    values.push(user.cnpj);
                }
                if( user.email ){
                    conditions.push(' email   ? ')
                    values.push( user.email);
                }
                if( user.nome){
                    conditions.push( ' nome ? ' )
                    values.push( user.nome)
                }
                if(user.responsavel){
                    conditions.push( '  responsavel ? ')
                     values.push( user.responsavel)
                }
                if( user.senha){
                    conditions.push(' senha ? ')
                    values.push(user.senha)
                }
                if( user.telefone){
                    conditions.push(' telefone ? ')
                    values.push(user.telefone)
                }

                let whereClause = ' WHERE codigo ? '
                values.push(user.codigo);

                    let finalSql = sql;

                if( conditions.length > 0 ){
                    finalSql = sql + conditions.join( ' , ') + whereClause
                }

            conn.query(sql,  (err:any, result:ResultSetHeader  )=>{ 
                        if(err) reject(err);
                        else 
                            resolve(result);
                    })
                })
            }



 

}