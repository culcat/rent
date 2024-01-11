import {db} from '../db'

export async function feedback(phone: string, id_apart: number, msg: string) {
    const existingFeedback = await db.oneOrNone('SELECT id FROM feedback WHERE phone = $1 AND id_apart = $2', [phone, id_apart]);

    if (existingFeedback) {
        throw new Error('User has already left feedback for this apartment.');
    }

    //
    const queryText = 'INSERT INTO feedback (phone, id_apart, msg) VALUES ($1, $2, $3) RETURNING id';
    const values = [phone, id_apart, msg];

    try {
        const result = await db.one(queryText, values);
        return result.id;
    } catch (e) {
        console.error('Error creating user:', e);
        throw e;
    }
}


export async function feedbackGet() {
    const queryText = 'SELECT * from feedback'
    try {
        const result = await db.many(queryText)
        return result
    }
    catch (e) {
        console.error(e)
        throw e
    }
    }