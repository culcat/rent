import {db} from "../db";



export async function createUser(username: string, password: string) {
    const queryText = 'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING id';
    const values = [username, password];

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