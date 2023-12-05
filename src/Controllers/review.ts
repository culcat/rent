import {db} from '../db'

export  async function review(name:string,text:string,user_id:string){
    const queryText = 'INSERT INTO review (name,text,user_id) VALUES ($1,$2,$3) RETURNING id'
    const values = [name,text,user_id]
    try{
        const result = await db.one(queryText, values);
        return result.id;
    }
    catch (e) {
        console.error('Error creating user:', e);
        throw e;
    }
}