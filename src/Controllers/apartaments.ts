import {db} from "../db";
export async function createAps(addres: string, description: string,phone: string, price: number,rooms: number, img: string[],type:number,area:string,username:string) {
    const queryText = 'INSERT INTO apartments (address, description,phone,price,rooms,img,type,area,username) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9) RETURNING id';
    const values = [addres, description,phone,price,rooms,img,type,area,username];

    try {
        const result = await db.one(queryText, values);
        return result.id;
    } catch (error) {
        console.error('Error creating apart:', error);
        throw error;
    }
}


export async function getAps() {
    const queryText = 'SELECT * from apartments'
    try {
        const result = await db.many(queryText);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function delAps(id:number){
    const queryText = 'DELETE FROM apartments WHERE id = $1';
    const values = [id];

    try {
        const result = await db.one(queryText, values);
        return result.id;
    } catch (error) {
        console.error('Error creating apart:', error);
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
