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

export async function getReviewByUsername(username: string) {
    const queryText = 'SELECT * FROM review WHERE user_id = $1';
    const values = [username];

    try {
        const user = await db.oneOrNone(queryText, values);
        return user;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

export async function deleteReviewByID(id:number) {
    const queryText = 'DELETE FROM review WHERE id = $1';
    const values = [id];

    try {
        const user = await db.oneOrNone(queryText, values);
        return user;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}