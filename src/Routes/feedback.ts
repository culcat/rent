import express, { Request, Response } from 'express';
import * as db from '../Controllers/feedback';
import apartaments from "./apartaments";


const router = express.Router();
/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Создание отлика
 *     tags:
 *       - Отклики
 *     requestBody:
 *       description: Создает новый отклик с предоставленными данными.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               id_apart:
 *                 type: number
 *               msg:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Отклик успешно создан
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
/**
 * @swagger
 * /api/feedback/get:
 *   get:
 *     summary: Список откликов
 *     tags:
 *       - Отклики
 *     responses:
 *       '200':
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   // Define the properties of your apartment object here
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

/**
 * @swagger
 * /api/feedback/delete:
 *   delete:
 *     summary: Удаление откликов
 *     tags:
 *       - Отклики
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Имя пользователя, которого необходимо удалить
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
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


router.post('/feedback', async (req:Request, res:Response) => {
    try {
        const { phone, id_apart,msg } = req.body;
        console.log(req.body);
        const feedbackId = await db.feedback(phone, id_apart,msg);
        res.status(201).json({ id: feedbackId, message: 'Feedback created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/feedback/get', async (req, res) => {
    try {
        const apartments = await db.feedbackGet();
        res.status(200).json(apartments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/feedback/delete',async(req:Request, res)=>{
    const {id} = req.query
    try{
        const delFeedback = await db.deleteFeedback(Number(id))
        res.status(200).json(delFeedback)
    }catch (e) {
        console.error(e)
        res.status(500).json({error:"Iternal Server Error"})
    }
})



export default router;