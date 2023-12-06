import {db} from "../db";
export async function createCard(tittle:string,img:string) {
    const queryText = 'INSERT INTO cards (tittle,img) VALUES ($1, $2) RETURNING id';
    const values = [tittle,img];

    try {
        const result = await db.one(queryText, values);
        return result.id;
    } catch (error) {
        console.error('Error creating apart:', error);
        throw error;
    }
}


export async function getCard() {
    const queryText = 'SELECT * from cards'
    try {
        const result = await db.many(queryText);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}



// export async function getUserByUsername(username: string) {
//     const queryText = 'SELECT * FROM users WHERE login = $1';
//     const values = [username];
//
//     try {
//         const user = await db.oneOrNone(queryText, values);
//         return user;
//     } catch (error) {
//         console.error('Error getting user:', error);
//         throw error;
//     }
// }
