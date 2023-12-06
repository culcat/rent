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



export default router;