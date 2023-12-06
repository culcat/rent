import {db} from '../db'

export  async function feedback(phone:string,id_apart:number){
    const queryText = 'INSERT INTO feedback (phone,id_apart) VALUES ($1,$2) RETURNING id'
    const values = [phone,id_apart]
    try{
        const result = await db.one(queryText, values);
        return result.id;
    }
    catch (e) {
        console.error('Error creating user:', e);
        throw e;
    }
}

