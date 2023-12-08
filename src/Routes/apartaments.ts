import express, { Request, Response } from 'express';
import * as db from '../Controllers/apartaments';

const router = express.Router();
/**
 * @swagger
 * /api/apartments/create:
 *   post:
 *     summary: Создание квартиры
 *     tags:
 *       - Квартиры
 *     requestBody:
 *       description: Создает новую квартиру с предоставленными данными.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               description:
 *                 type: string
 *               phone:
 *                 type: string
 *               price:
 *                 type: number
 *               rooms:
 *                 type: number
 *               type:
 *                 type: number
 *               img1:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Квартира успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
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
 * /api/apartments/get:
 *   get:
 *     summary: Список квартир
 *     tags:
 *       - Квартиры
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
 * @openapi
 * /api/apartments/delete:
 *   delete:
 *     summary: Удаление квартир
 *     tags:
 *       - Квартиры
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Имя пользователя
 *
 *     responses:
 *       '200':
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT токен
 *       '401':
 *         description: Invalid token
 *       '500':
 *         description: Внутренняя ошибка сервера
 */






router.post('/apartments/create', async (req: Request, res: Response) => {
    const { addres, description, phone, price, rooms, img1,type } = req.body;

    try {
        const id = await db.createAps(addres, description, phone, price, rooms, img1,type);
        res.status(201).json({ id, message: 'Apartment created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/apartments/get', async (req, res) => {
    try {
        const apartments = await db.getAps();
        res.status(200).json(apartments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/apartments/delete', async (req:Request, res:Response) => {
    try {
        const { id } = req.query;
        const idNumb = Number(id)
        const feedbackId = await db.delAps(idNumb);
        res.status(201).json({ id: feedbackId, message: 'Feedback created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




export default router;