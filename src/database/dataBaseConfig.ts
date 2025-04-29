import { createPool } from "mysql2";

 
export const conn = createPool({
    host:'server.intersig.com.br', 
    user:'intersig',
    password:'Ganapataye',
    port:3306
})