
import 'dotenv/config'
import { createPool } from "mysql2";

 const hostDatabase = process.env.HOST;
 const portDatabase = Number(process.env.PORT)
 const passwordDatabase = process.env.PASSWORD
 

    const userDataBase = process.env.USER

export const conn = createPool({
    host:hostDatabase, 
    user: userDataBase,
    password: passwordDatabase,
    port: portDatabase
})