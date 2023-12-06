import {db} from "../db";



export async function createUser(username: string, password: string,firstname:string,lastname:string,thirdname:string,position:string,img:string) {
    const queryText = 'INSERT INTO users (login, password,firstname,lastname,thirdname,position,string) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING id';
    const values = [username, password,firstname,lastname,thirdname,position,img];

    try {
        const result = await db.one(queryText, values);
        return result.id;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function getUserByUsername(username: string) {
    const queryText = 'SELECT * FROM users WHERE login = $1';
    const values = [username];

    try {
        const user = await db.oneOrNone(queryText, values);
        return user;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}