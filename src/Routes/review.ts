import express, { Request, Response } from 'express';
import * as db from '../Controllers/review';



const router = express.Router();
/**
 * @swagger
 * /api/review:
 *   post:
 *     summary: Создание отзыва
 *     tags:
 *       - Отзывы
 *     requestBody:
 *       description: Создает новый отзыв с предоставленными данными.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               text:
 *                 type: string
 *               user_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Отзыв успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 message:
 *                   type: string
 *       '500':
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */






router.post('/review', async (req:Request, res:Response) => {
    try {
        const { name,text,user_id } = req.body;
        console.log(req.body);
        const feedbackId = await db.review(name,text,user_id);
        res.status(201).json({ id: feedbackId, message: 'Feedback created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





export default router;