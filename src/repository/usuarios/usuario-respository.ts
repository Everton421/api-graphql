import { conn } from "../../database/dataBaseConfig";
import { IUsuario } from "./IUsuario";


export class UsuariosRepository{    


    async findByEmailPassword(email:string, senha:any, dbName:string ):Promise< IUsuario[] > { 
        return new Promise< IUsuario[]>(    (resolve, reject)=>{
            let sql = `
                select * from ${dbName}.usuarios where email = ? and senha = ? 
            `;
              conn.query(sql, [ email, senha  ],(err:any, result:any )=>{ 
                if(err){ 
                    console.log( 'Erro ao consultar usuarios ',err)
                    reject(err);
                } else { 
                    resolve(result);
                }
                })

        })
    }

}